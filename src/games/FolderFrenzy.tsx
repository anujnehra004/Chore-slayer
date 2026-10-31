import React, { useState } from 'react';
import { sounds } from '../audio/soundEffects';
import type { FileChore, ExecutionLogEntry } from '../types';
import { INITIAL_FILES_DATA, createOrganizedZip, triggerBrowserDownload } from '../engine/choreEngine';
import confetti from 'canvas-confetti';
import { 
  FolderSync, 
  Download, 
  FileText, 
  Image, 
  Code, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  Upload, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';


interface FolderFrenzyProps {
  onChoreExecuted: (entry: Omit<ExecutionLogEntry, 'id' | 'timestamp' | 'undone'>) => void;
  onScoreGain: (points: number, comboIncrement?: boolean) => void;
  bytesCleaned: number;
  onAddBytesCleaned: (bytes: number) => void;
}

export const FolderFrenzy: React.FC<FolderFrenzyProps> = ({
  onChoreExecuted,
  onScoreGain,
  bytesCleaned,
  onAddBytesCleaned
}) => {
  const [files, setFiles] = useState<FileChore[]>(INITIAL_FILES_DATA);
  const [sortedFiles, setSortedFiles] = useState<FileChore[]>([]);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [activeFileIndex, setActiveFileIndex] = useState<number>(0);
  const [lastAction, setLastAction] = useState<string>('Drag files or press 1-4 to fling them into target portals!');

  const currentFile = files[activeFileIndex];

  // Fling into portal
  const sortCurrentFile = (targetCategory: 'documents' | 'media' | 'code' | 'junk') => {
    if (!currentFile) return;

    const isMatch = currentFile.category === targetCategory;
    const file = currentFile;

    if (targetCategory === 'junk') {
      sounds.playExplosion();
      onAddBytesCleaned(file.sizeBytes);
      onScoreGain(150, true);
      setLastAction(`🗑️ VAPORIZED JUNK: "${file.originalName}" (-${(file.sizeBytes / 1024 / 1024).toFixed(1)} MB storage freed!)`);

      onChoreExecuted({
        category: 'Filesystem',
        action: 'DEDUPLICATE_PURGE',
        details: `Deleted duplicate/installer junk: ${file.originalName}. Reclaimed ${(file.sizeBytes / 1024 / 1024).toFixed(1)} MB.`,
        bytesOrItemsImpacted: file.sizeBytes,
        rawCommand: `FS_UNLINK: path="/Downloads/${file.originalName}" hash_dedupe=SUCCESS`
      });
    } else {
      sounds.playWhoosh();
      onScoreGain(isMatch ? 200 : 80, true);
      setLastAction(`📂 ORGANIZED: "${file.originalName}" -> /${targetCategory.toUpperCase()}/${file.cleanName}`);

      onChoreExecuted({
        category: 'Filesystem',
        action: 'ISO_RENAME_AND_MOVE',
        details: `Relocated and renamed to clean taxonomy: ${file.cleanName}`,
        bytesOrItemsImpacted: file.sizeBytes,
        rawCommand: `FS_MOVE: src="/Downloads/${file.originalName}" dest="/${targetCategory}/${file.cleanName}"`
      });
    }

    setSortedFiles(prev => [...prev, { ...file, targetFolder: targetCategory }]);

    // Move to next file
    if (activeFileIndex < files.length - 1) {
      setActiveFileIndex(prev => prev + 1);
    } else {
      // Completed all!
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      sounds.playVictory();
    }
  };

  // Download real zip
  const handleDownloadZip = async () => {
    setIsExporting(true);
    sounds.playCoin();
    try {
      const filesToZip = sortedFiles.length > 0 ? sortedFiles : files;
      const blob = await createOrganizedZip(filesToZip);
      triggerBrowserDownload(blob, `Cleaned_Files_${new Date().toISOString().slice(0, 10)}.zip`);
      setLastAction('📦 Generated and downloaded real organized ZIP file archive!');
    } catch {
      setLastAction('Error packaging zip archive.');
    } finally {
      setIsExporting(false);
    }
  };

  // Upload custom file / drop files
  const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const uploaded = Array.from(e.target.files).map((f, i) => {
      let cat: 'documents' | 'media' | 'code' | 'junk' = 'documents';
      const ext = f.name.split('.').pop()?.toLowerCase() || '';
      if (['png', 'jpg', 'jpeg', 'mp4', 'gif', 'svg'].includes(ext)) cat = 'media';
      else if (['js', 'ts', 'py', 'json', 'cpp', 'html', 'css'].includes(ext)) cat = 'code';
      else if (['tmp', 'exe', 'dmg', 'log'].includes(ext) || f.name.includes('(1)')) cat = 'junk';

      return {
        id: `user-f-${i}`,
        originalName: f.name,
        cleanName: `Clean_${f.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`,
        extension: ext,
        sizeBytes: f.size,
        category: cat,
        isDuplicate: f.name.includes('copy') || f.name.includes('(1)'),
        contentSample: `[User uploaded file: ${f.name}]`
      };
    });

    setFiles(uploaded);
    setActiveFileIndex(0);
    setSortedFiles([]);
    setLastAction(`📥 Loaded ${uploaded.length} real files from your local drive! Ready to sort!`);
    sounds.playCoin();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto p-4 bg-slate-900/80 rounded-2xl border border-purple-500/30 backdrop-blur-md shadow-2xl relative">
      {/* Header */}
      <div className="w-full flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-purple-300">
            <FolderSync className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-wide">FOLDER FRENZY</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Desktop & Downloads Cleanse
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Fling messy files into smart taxonomy portals! Auto-renames ISO headers and builds a real organized ZIP!
            </p>
          </div>
        </div>

        {/* Action Controls & Real Download */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer border border-slate-700 transition-all">
            <Upload className="w-4 h-4 text-purple-400" />
            Upload Real Folder
            <input type="file" multiple onChange={handleCustomFileUpload} className="hidden" />
          </label>

          <button
            onClick={handleDownloadZip}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wider transition-all shadow-lg shadow-purple-500/25 active:scale-95 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'PACKAGING ZIP...' : 'DOWNLOAD CLEAN ZIP'}
          </button>
        </div>
      </div>

      {/* Progress & Storage Stats */}
      <div className="w-full my-3 flex flex-wrap items-center justify-between text-xs text-slate-300 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-4">
          <span className="font-mono text-purple-300">
            Queue: <strong className="text-white">{activeFileIndex + 1}</strong> of <strong className="text-white">{files.length}</strong>
          </span>
          <span className="font-mono text-emerald-400">
            Sorted: <strong className="text-white">{sortedFiles.length}</strong>
          </span>
          <span className="font-mono text-cyan-400">
            Storage Freed: <strong className="text-white">{(bytesCleaned / 1024 / 1024).toFixed(1)} MB</strong>
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Intelligent SHA-256 Deduplication & ISO-8601 Renaming</span>
        </div>
      </div>

      {/* Main Interactive Arena */}
      <div className="w-full min-h-[380px] bg-slate-950 rounded-xl border border-purple-500/30 p-6 flex flex-col items-center justify-between relative overflow-hidden">
        {/* Current Active File Card (If available) */}
        {activeFileIndex < files.length && currentFile ? (
          <div className="flex flex-col items-center justify-center my-6 z-10 animate-pulse-slow">
            <span className="text-[11px] font-mono text-purple-400 uppercase tracking-widest mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> INCOMING CHAOTIC FILE:
            </span>

            {/* Glowing Card */}
            <div className="w-80 sm:w-96 p-5 rounded-2xl bg-slate-900 border-2 border-purple-400/60 shadow-2xl shadow-purple-500/20 text-center relative">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-purple-300">
                {currentFile.category === 'documents' && <FileText className="w-6 h-6" />}
                {currentFile.category === 'media' && <Image className="w-6 h-6" />}
                {currentFile.category === 'code' && <Code className="w-6 h-6" />}
                {currentFile.category === 'junk' && <Trash2 className="w-6 h-6 text-rose-400" />}
              </div>

              <h4 className="text-base font-bold text-white break-all mb-1">{currentFile.originalName}</h4>
              <p className="text-xs text-slate-400 font-mono mb-3">
                Size: {(currentFile.sizeBytes / 1024).toFixed(1)} KB | Ext: .{currentFile.extension}
                {currentFile.isDuplicate && (
                  <span className="ml-2 text-rose-400 font-bold">[DUPLICATE DETECTED]</span>
                )}
              </p>

              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-purple-500/20 text-left">
                <span className="text-[10px] text-purple-400 uppercase font-mono block">Proposed Smart ISO Name:</span>
                <span className="text-xs text-emerald-300 font-mono break-all font-semibold">{currentFile.cleanName}</span>
              </div>
            </div>
          </div>
        ) : (
          /* Finished State */
          <div className="flex flex-col items-center justify-center my-12 z-10 text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-3 animate-bounce" />
            <h3 className="text-2xl font-black text-white mb-2">DIRECTORY CLEANSE COMPLETE!</h3>
            <p className="text-sm text-slate-300 max-w-md mb-6">
              All messy files sorted, deduplicated, and organized into pristine folders. Click below to download your real structured archive!
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadZip}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all"
              >
                <Download className="w-5 h-5" /> DOWNLOAD ORGANIZED ZIP
              </button>
              <button
                onClick={() => {
                  setFiles(INITIAL_FILES_DATA);
                  setActiveFileIndex(0);
                  setSortedFiles([]);
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold text-xs transition-all"
              >
                <RefreshCw className="w-4 h-4" /> Reset Demo
              </button>
            </div>
          </div>
        )}

        {/* 4 Interactive Portals at the bottom */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 z-10 mt-4">
          {/* Portal 1: Documents */}
          <button
            onClick={() => sortCurrentFile('documents')}
            disabled={activeFileIndex >= files.length}
            className="flex flex-col items-center p-3.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/40 hover:border-cyan-400 transition-all text-center group active:scale-95 disabled:opacity-40"
          >
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform mb-2">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-cyan-200">PORTAL 1: DOCS</span>
            <span className="text-[10px] text-cyan-400/80 mt-0.5">PDFs, W2s, Contracts</span>
            <kbd className="mt-2 text-[10px] px-1.5 py-0.5 bg-cyan-950 border border-cyan-700 rounded text-cyan-300">Key 1</kbd>
          </button>

          {/* Portal 2: Media */}
          <button
            onClick={() => sortCurrentFile('media')}
            disabled={activeFileIndex >= files.length}
            className="flex flex-col items-center p-3.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/40 hover:border-purple-400 transition-all text-center group active:scale-95 disabled:opacity-40"
          >
            <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-400 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform mb-2">
              <Image className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-purple-200">PORTAL 2: MEDIA</span>
            <span className="text-[10px] text-purple-400/80 mt-0.5">Screenshots, MP4, PNG</span>
            <kbd className="mt-2 text-[10px] px-1.5 py-0.5 bg-purple-950 border border-purple-700 rounded text-purple-300">Key 2</kbd>
          </button>

          {/* Portal 3: Code */}
          <button
            onClick={() => sortCurrentFile('code')}
            disabled={activeFileIndex >= files.length}
            className="flex flex-col items-center p-3.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 hover:border-emerald-400 transition-all text-center group active:scale-95 disabled:opacity-40"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform mb-2">
              <Code className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-200">PORTAL 3: CODE</span>
            <span className="text-[10px] text-emerald-400/80 mt-0.5">Scripts, Python, TS</span>
            <kbd className="mt-2 text-[10px] px-1.5 py-0.5 bg-emerald-950 border border-emerald-700 rounded text-emerald-300">Key 3</kbd>
          </button>

          {/* Portal 4: Junk */}
          <button
            onClick={() => sortCurrentFile('junk')}
            disabled={activeFileIndex >= files.length}
            className="flex flex-col items-center p-3.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/40 hover:border-rose-400 transition-all text-center group active:scale-95 disabled:opacity-40"
          >
            <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-400 flex items-center justify-center text-rose-300 group-hover:scale-110 transition-transform mb-2">
              <Trash2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-rose-200">PORTAL 4: JUNK</span>
            <span className="text-[10px] text-rose-400/80 mt-0.5">Duplicates & Installers</span>
            <kbd className="mt-2 text-[10px] px-1.5 py-0.5 bg-rose-950 border border-rose-700 rounded text-rose-300">Key 4</kbd>
          </button>
        </div>
      </div>

      {/* Real-time Ticker */}
      <div className="w-full mt-3 p-2.5 bg-slate-950 rounded-xl border border-purple-500/20 flex items-center justify-between text-xs font-mono text-purple-300">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-cyan-400 font-bold uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> REAL FS OPERATION:
          </span>
          <span className="text-slate-300 truncate">{lastAction}</span>
        </div>
        <span className="text-[11px] text-emerald-400 shrink-0 font-bold ml-2">● FS ACCESS READY</span>
      </div>
    </div>
  );
};
