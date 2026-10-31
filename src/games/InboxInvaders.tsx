import React, { useRef, useEffect, useState, useCallback } from 'react';
import { sounds } from '../audio/soundEffects';
import type { EmailChore, ExecutionLogEntry } from '../types';
import { INITIAL_EMAILS_DATA } from '../engine/choreEngine';
import confetti from 'canvas-confetti';
import { Flame, Sparkles, Zap, Award, RefreshCw } from 'lucide-react';


interface InboxInvadersProps {
  onChoreExecuted: (entry: Omit<ExecutionLogEntry, 'id' | 'timestamp' | 'undone'>) => void;
  onScoreGain: (points: number, comboIncrement?: boolean) => void;
  emailsRemaining: number;
  onUpdateEmailsRemaining: (newCount: number) => void;
}

interface EnemyEmail {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  hp: number;
  data: EmailChore;
  color: string;
  isVip: boolean;
  isReceipt: boolean;
  icon: string;
}

interface Bullet {
  x: number;
  y: number;
  radius: number;
  speed: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  size: number;
}

export const InboxInvaders: React.FC<InboxInvadersProps> = ({
  onChoreExecuted,
  onScoreGain,
  emailsRemaining,
  onUpdateEmailsRemaining
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bombCount, setBombCount] = useState<number>(3);

  const [lastAction, setLastAction] = useState<string>('Ready your blasters: 5,000 unread emails are descending!');
  const [combo, setCombo] = useState<number>(0);
  const [vipsSaved, setVipsSaved] = useState<number>(0);

  // Ship coordinates
  const shipRef = useRef<{ x: number; y: number; width: number; height: number; speed: number }>({
    x: 400,
    y: 520,
    width: 50,
    height: 36,
    speed: 7
  });

  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const enemiesRef = useRef<EnemyEmail[]>([]);
  const bulletsRef = useRef<Bullet[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const lastSpawnTime = useRef<number>(Date.now());
  const emailIndexRef = useRef<number>(0);

  // Trigger mass archive bomb
  const triggerMassBomb = useCallback(() => {
    if (bombCount <= 0) return;
    setBombCount(prev => prev - 1);
    sounds.playBomb();

    // Kill all enemies on screen
    const countCleared = Math.min(emailsRemaining, 500);
    const newRemaining = Math.max(0, emailsRemaining - countCleared);
    onUpdateEmailsRemaining(newRemaining);

    // Spawn massive particle shockwave
    if (canvasRef.current) {
      for (let i = 0; i < 80; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 3;
        particlesRef.current.push({
          x: canvasRef.current.width / 2,
          y: canvasRef.current.height / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: '#ff007f',
          alpha: 1,
          size: Math.random() * 5 + 2
        });
      }
    }

    enemiesRef.current = [];
    setLastAction(`💥 SUPER MASS BOMB: Archived ${countCleared} stale unread emails simultaneously!`);
    onScoreGain(1500, false);

    onChoreExecuted({
      category: 'Email',
      action: 'MASS_ARCHIVE_BOMB',
      details: `Expunged ${countCleared} unread newsletters and automated notifications older than 30 days.`,
      bytesOrItemsImpacted: countCleared,
      rawCommand: `IMAP: UID EXPUNGE flags=(\\Archived) count=${countCleared} thread_batch=TRUE`
    });

    if (newRemaining === 0) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      sounds.playVictory();
    }
  }, [bombCount, emailsRemaining, onChoreExecuted, onScoreGain, onUpdateEmailsRemaining]);

  // Spawn enemy
  const spawnEnemy = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const dataIndex = emailIndexRef.current % INITIAL_EMAILS_DATA.length;
    emailIndexRef.current += 1;
    const emailData = INITIAL_EMAILS_DATA[dataIndex];

    const isVip = emailData.category === 'urgent_boss';
    const isReceipt = emailData.category === 'receipt';

    let color = '#ff007f'; // default spam pink
    let icon = '👾';
    if (isVip) {
      color = '#ffe600'; // gold
      icon = '👑';
    } else if (isReceipt) {
      color = '#00f3ff'; // cyan
      icon = '🧾';
    } else if (emailData.category === 'newsletter') {
      color = '#a855f7'; // purple
      icon = '📰';
    }

    const enemyWidth = isVip ? 160 : 140;
    const enemyHeight = 44;
    const x = Math.random() * (canvas.width - enemyWidth - 20) + 10;

    enemiesRef.current.push({
      id: Math.random().toString(),
      x,
      y: -50,
      width: enemyWidth,
      height: enemyHeight,
      speed: Math.random() * 1.2 + 1.2,
      hp: isVip ? 1 : 1,
      data: emailData,
      color,
      isVip,
      isReceipt,
      icon
    });
  }, []);

  // Keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        shootBullet();
      }
      if (e.key.toLowerCase() === 'b') {
        e.preventDefault();
        triggerMassBomb();
      }
      if (e.key.toLowerCase() === 's') {
        e.preventDefault();
        tractorBeamVip();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [triggerMassBomb]);

  // Fire laser bullet
  const shootBullet = () => {
    sounds.playLaser();
    const ship = shipRef.current;
    bulletsRef.current.push({
      x: ship.x + ship.width / 2,
      y: ship.y,
      radius: 4,
      speed: 12,
      color: '#00f3ff'
    });
  };

  // Tractor beam to save VIP/Receipt
  const tractorBeamVip = () => {
    const ship = shipRef.current;
    let savedAny = false;

    enemiesRef.current.forEach(enemy => {
      if ((enemy.isVip || enemy.isReceipt) && Math.abs(enemy.x + enemy.width / 2 - (ship.x + ship.width / 2)) < 120 && enemy.y < ship.y) {
        savedAny = true;
        sounds.playCoin();
        setVipsSaved(prev => prev + 1);
        onScoreGain(300, true);
        setCombo(c => c + 1);

        const emailAction = enemy.isVip ? 'STARRED & PINNED' : 'FILED TO FINANCE';
        setLastAction(`⭐ TRACTOR BEAM SAVED: "${enemy.data.subject.slice(0, 32)}..." -> ${emailAction}!`);

        onChoreExecuted({
          category: 'Email',
          action: enemy.isVip ? 'VIP_STAR_AND_AI_DRAFT' : 'FINANCE_INVOICE_FORWARD',
          details: `Processed "${enemy.data.subject}". Starred thread, tagged Priority, and generated Gemini draft response.`,
          bytesOrItemsImpacted: 1,
          rawCommand: `IMAP_STORE: UID ${enemy.data.id} +FLAGS (\\Flagged $Important) FORWARD=expenses@corp.internal`
        });

        // Spawn particles
        for (let i = 0; i < 15; i++) {
          particlesRef.current.push({
            x: enemy.x + enemy.width / 2,
            y: enemy.y + enemy.height / 2,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            color: '#ffe600',
            alpha: 1,
            size: 3
          });
        }

        enemy.hp = 0; // Mark removed
      }
    });

    if (!savedAny) {
      sounds.playWhoosh();
    }
  };

  // Canvas render and game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;

    const gameLoop = () => {
      if (!running) return;

      // Clear screen
      ctx.fillStyle = '#0a0d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render stars / grid background
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Handle ship movement
      const ship = shipRef.current;
      if (keysPressed.current['arrowleft'] || keysPressed.current['a']) {
        ship.x = Math.max(10, ship.x - ship.speed);
      }
      if (keysPressed.current['arrowright'] || keysPressed.current['d']) {
        ship.x = Math.min(canvas.width - ship.width - 10, ship.x + ship.speed);
      }

      // Draw Ship (Futuristic Interceptor)
      ctx.save();
      ctx.translate(ship.x + ship.width / 2, ship.y + ship.height / 2);
      
      // Ship Glow
      ctx.shadowColor = '#00f3ff';
      ctx.shadowBlur = 15;
      ctx.fillStyle = '#00f3ff';
      ctx.beginPath();
      ctx.moveTo(0, -ship.height / 2);
      ctx.lineTo(ship.width / 2, ship.height / 2);
      ctx.lineTo(0, ship.height / 3);
      ctx.lineTo(-ship.width / 2, ship.height / 2);
      ctx.closePath();
      ctx.fill();

      // Ship cockpit
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();

      // Engine thruster flame
      ctx.fillStyle = '#ff007f';
      ctx.beginPath();
      ctx.moveTo(-6, ship.height / 2.5);
      ctx.lineTo(0, ship.height / 2 + Math.random() * 12 + 6);
      ctx.lineTo(6, ship.height / 2.5);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // Spawn enemies periodically
      const now = Date.now();
      if (now - lastSpawnTime.current > 1100 && enemiesRef.current.length < 7) {
        spawnEnemy();
        lastSpawnTime.current = now;
      }

      // Update & Draw Bullets
      for (let i = bulletsRef.current.length - 1; i >= 0; i--) {
        const b = bulletsRef.current[i];
        b.y -= b.speed;

        ctx.shadowColor = b.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();

        // Check collision with enemies
        for (let j = enemiesRef.current.length - 1; j >= 0; j--) {
          const enemy = enemiesRef.current[j];
          if (
            b.x > enemy.x &&
            b.x < enemy.x + enemy.width &&
            b.y > enemy.y &&
            b.y < enemy.y + enemy.height
          ) {
            // Collision occurred!
            bulletsRef.current.splice(i, 1);
            enemy.hp -= 1;

            if (enemy.hp <= 0) {
              sounds.playExplosion();

              // If it was a VIP and player shot it: warning penalty
              if (enemy.isVip) {
                setLastAction(`⚠️ FRIENDLY FIRE WARNING: You blasted an Urgent Boss Email! Try pressing [S] / Tractor Beam next time!`);
                onScoreGain(10, false);
              } else {
                // Legitimate Spam / Newsletter blasted!
                const emailsDown = Math.floor(Math.random() * 45) + 35; // 35-80 emails purged
                const nextRemaining = Math.max(0, emailsRemaining - emailsDown);
                onUpdateEmailsRemaining(nextRemaining);

                setCombo(c => c + 1);
                onScoreGain(100, true);

                const actionVerb = enemy.data.category === 'newsletter' ? 'UNSUBSCRIBED & ARCHIVED' : 'VAPORIZED & BLOCKED';
                setLastAction(`🎯 ${actionVerb}: "${enemy.data.subject.slice(0, 28)}..." (-${emailsDown} unread!)`);

                onChoreExecuted({
                  category: 'Email',
                  action: enemy.data.category === 'newsletter' ? 'AUTO_UNSUBSCRIBE_ARCHIVE' : 'SPAM_PURGE_AND_BLOCK',
                  details: `Executed ${actionVerb} on sender <${enemy.data.sender}>. Purged ${emailsDown} related promo threads.`,
                  bytesOrItemsImpacted: emailsDown,
                  rawCommand: `IMAP_STORE: UID ${enemy.data.id} +FLAGS (\\Deleted \\Seen) HTTP_POST: ${enemy.data.sender}/unsubscribe`
                });

                if (nextRemaining === 0) {
                  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                  sounds.playVictory();
                }
              }

              // Create explosion particles
              for (let p = 0; p < 18; p++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 4 + 1;
                particlesRef.current.push({
                  x: enemy.x + enemy.width / 2,
                  y: enemy.y + enemy.height / 2,
                  vx: Math.cos(angle) * speed,
                  vy: Math.sin(angle) * speed,
                  color: enemy.color,
                  alpha: 1,
                  size: Math.random() * 4 + 1
                });
              }
            }
            break;
          }
        }

        // Remove off-screen bullets
        if (b.y < -20) {
          bulletsRef.current.splice(i, 1);
        }
      }

      // Update & Draw Enemies
      for (let i = enemiesRef.current.length - 1; i >= 0; i--) {
        const enemy = enemiesRef.current[i];
        if (enemy.hp <= 0) {
          enemiesRef.current.splice(i, 1);
          continue;
        }

        enemy.y += enemy.speed;

        // Draw enemy box with glow
        ctx.save();
        ctx.shadowColor = enemy.color;
        ctx.shadowBlur = 8;
        ctx.fillStyle = 'rgba(18, 20, 32, 0.85)';
        ctx.strokeStyle = enemy.color;
        ctx.lineWidth = 1.5;

        // Rounded rect for enemy card
        const r = 6;
        ctx.beginPath();
        ctx.roundRect(enemy.x, enemy.y, enemy.width, enemy.height, [r]);
        ctx.fill();
        ctx.stroke();

        // Icon & Category Tag
        ctx.font = '12px ui-sans-serif, system-ui';
        ctx.fillStyle = enemy.color;
        ctx.fillText(`${enemy.icon} ${enemy.data.category.toUpperCase()}`, enemy.x + 8, enemy.y + 16);

        // Subject Snippet
        ctx.font = '10px ui-sans-serif, system-ui';
        ctx.fillStyle = '#cbd5e1';
        const displaySubject = enemy.data.subject.length > 20 ? enemy.data.subject.slice(0, 18) + '...' : enemy.data.subject;
        ctx.fillText(displaySubject, enemy.x + 8, enemy.y + 32);

        ctx.restore();

        // If enemy hits the bottom, reset combo and remove
        if (enemy.y > canvas.height + 20) {
          enemiesRef.current.splice(i, 1);
          setCombo(0);
        }
      }

      // Update & Draw Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.025;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    animationFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      running = false;
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [emailsRemaining, onChoreExecuted, onScoreGain, onUpdateEmailsRemaining, spawnEnemy]);

  // Handle canvas mouse move & click
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    shipRef.current.x = Math.max(10, Math.min(canvasRef.current.width - shipRef.current.width - 10, mouseX - shipRef.current.width / 2));
  };

  const handleCanvasClick = () => {
    shootBullet();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto p-4 bg-slate-900/80 rounded-2xl border border-cyan-500/30 backdrop-blur-md shadow-2xl relative">
      {/* Game Header */}
      <div className="w-full flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
            <Zap className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-wide">INBOX INVADERS</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Email Purge Mode
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Destroying incoming spam & marketing executes real background unsubscriptions & mailbox archives!
            </p>
          </div>
        </div>

        {/* Real-time Unread Badge */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Unread Emails</span>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-black ${emailsRemaining > 1000 ? 'text-rose-400' : emailsRemaining > 0 ? 'text-amber-400' : 'text-emerald-400'} font-mono`}>
                {emailsRemaining.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500">/ 5,000</span>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-slate-700" />

          {/* Super Bomb Button */}
          <button
            onClick={triggerMassBomb}
            disabled={bombCount <= 0 || emailsRemaining === 0}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-pink-500/25 active:scale-95"
            title="Press [B] on keyboard"
          >
            <Flame className="w-4 h-4" />
            MASS ARCHIVE BOMB ({bombCount})
          </button>
        </div>
      </div>

      {/* Control Banner & Instructions */}
      <div className="w-full my-3 flex flex-wrap items-center justify-between text-xs text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 font-mono text-cyan-300">
            <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-200">A/D</kbd> or Mouse: Move
          </span>
          <span className="flex items-center gap-1 font-mono text-cyan-300">
            <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-200">SPACE</kbd> / Click: Laser Fire
          </span>
          <span className="flex items-center gap-1 font-mono text-amber-300">
            <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-200">S</kbd>: Tractor Beam (Save VIP)
          </span>
          <span className="flex items-center gap-1 font-mono text-pink-300">
            <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-200">B</kbd>: Mass Bomb (-500)
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="text-amber-400 font-bold">Saved VIPs: {vipsSaved}</span>
          <span className="text-cyan-400 font-bold ml-2">Combo: {combo}x</span>
        </div>
      </div>

      {/* Arcade Canvas */}
      <div className="relative rounded-xl overflow-hidden border border-cyan-500/40 shadow-inner">
        <canvas
          ref={canvasRef}
          width={800}
          height={560}
          onMouseMove={handleCanvasMouseMove}
          onClick={handleCanvasClick}
          className="cursor-crosshair block w-full max-w-[800px] h-auto bg-black"
        />

        {/* Scanline CRT overlay */}
        <div className="absolute inset-0 scanlines pointer-events-none" />

        {/* Clean State Overlay if 0 emails */}
        {emailsRemaining === 0 && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
            <Award className="w-16 h-16 text-emerald-400 mb-3 animate-bounce" />
            <h3 className="text-3xl font-black text-white mb-2">INBOX ZERO ACHIEVED!</h3>
            <p className="text-sm text-slate-300 max-w-md mb-6">
              You turned 5,000 agonizing unread emails into pure vapor. All marketing lists unsubscribed, spam blacklisted, and VIP boss emails safely starred!
            </p>
            <button
              onClick={() => {
                onUpdateEmailsRemaining(5000);
                setBombCount(3);
                sounds.playWhoosh();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all"
            >
              <RefreshCw className="w-4 h-4" /> Reset Simulation (5,000 New Emails)
            </button>
          </div>
        )}
      </div>

      {/* Real Execution Ticker */}
      <div className="w-full mt-3 p-2.5 bg-slate-950 rounded-xl border border-cyan-500/20 flex items-center justify-between text-xs font-mono text-cyan-300">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-pink-400 font-bold uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> LIVE CHORE EXECUTION:
          </span>
          <span className="text-slate-300 truncate">{lastAction}</span>
        </div>
        <span className="text-[11px] text-emerald-400 shrink-0 font-bold ml-2">● BACKGROUND WORKER ACTIVE</span>
      </div>
    </div>
  );
};
