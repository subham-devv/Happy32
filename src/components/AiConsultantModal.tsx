import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Upload, Search, Image as ImageIcon, Loader2 } from 'lucide-react';
import { clinicData } from '../data/clinicData';

interface AiConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiConsultantModal: React.FC<AiConsultantModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'analyze' | 'generate'>('chat');

  // Chat / Search State
  const [query, setQuery] = useState('');
  const [chatResponse, setChatResponse] = useState<string | null>(null);
  const [groundingSources, setGroundingSources] = useState<any[]>([]);
  const [loadingChat, setLoadingChat] = useState(false);

  // Multimodal Image Analysis State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysisPrompt, setAnalysisPrompt] = useState('Analyze my smile/skin concern and suggest treatments at Happy 32.');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  // Image Generation State
  const [genPrompt, setGenPrompt] = useState('A radiant smile transformation, porcelain veneers before and after studio aesthetic');
  const [genAspectRatio, setGenAspectRatio] = useState('1:1');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loadingGen, setLoadingGen] = useState(false);

  // Handlers
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoadingChat(true);
    setChatResponse(null);
    setGroundingSources([]);

    try {
      const res = await fetch('/api/ai/search-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setChatResponse(data.text || 'No response received.');
      setGroundingSources(data.groundingChunks || []);
    } catch (err: any) {
      setChatResponse(`Error: ${err.message || 'Failed to connect to AI server.'}`);
    } finally {
      setLoadingChat(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyzeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) return;

    setLoadingAnalysis(true);
    setAnalysisResult(null);

    try {
      const base64Data = imagePreview.split(',')[1];
      const mimeType = imageFile?.type || 'image/jpeg';

      const res = await fetch('/api/ai/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: analysisPrompt,
          imageBase64: base64Data,
          mimeType,
        }),
      });
      const data = await res.json();
      setAnalysisResult(data.text || 'Unable to analyze image.');
    } catch (err: any) {
      setAnalysisResult(`Error analyzing photo: ${err.message}`);
    } finally {
      setLoadingAnalysis(false);
    }
  };

  const handleGenerateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!genPrompt.trim()) return;

    setLoadingGen(true);
    setGeneratedImage(null);

    try {
      const res = await fetch('/api/ai/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: genPrompt,
          aspectRatio: genAspectRatio,
          imageSize: '1K',
        }),
      });
      const data = await res.json();
      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl);
      } else {
        alert('Image generation returned no output.');
      }
    } catch (err: any) {
      alert(`Error generating image: ${err.message}`);
    } finally {
      setLoadingGen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6 bg-[#0E0C0A]/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#F8F4EE] text-[#0E0C0A] w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl border border-[#EDE8DF] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 bg-[#EDE8DF] border-b border-[#0E0C0A]/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#A8854A] flex items-center justify-center text-[#F8F4EE]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cormorant font-medium text-xl text-[#0E0C0A]">
                  AI Dental & Skin Consultant
                </h3>
                <p className="font-dmSans text-xs text-[#7A6E64]">
                  Powered by Gemini · Happy 32 Dentofacial Studio
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#7A6E64] hover:text-[#0E0C0A] transition-colors rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-[#EDE8DF] bg-[#F8F4EE]">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 text-xs font-dmSans font-medium tracking-wide flex items-center justify-center gap-2 border-b-2 transition-colors ${
                activeTab === 'chat'
                  ? 'border-[#B85C3A] text-[#B85C3A]'
                  : 'border-transparent text-[#7A6E64] hover:text-[#0E0C0A]'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Ask & Search</span>
            </button>
            <button
              onClick={() => setActiveTab('analyze')}
              className={`flex-1 py-3 text-xs font-dmSans font-medium tracking-wide flex items-center justify-center gap-2 border-b-2 transition-colors ${
                activeTab === 'analyze'
                  ? 'border-[#B85C3A] text-[#B85C3A]'
                  : 'border-transparent text-[#7A6E64] hover:text-[#0E0C0A]'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Analyze Photo</span>
            </button>
            <button
              onClick={() => setActiveTab('generate')}
              className={`flex-1 py-3 text-xs font-dmSans font-medium tracking-wide flex items-center justify-center gap-2 border-b-2 transition-colors ${
                activeTab === 'generate'
                  ? 'border-[#B85C3A] text-[#B85C3A]'
                  : 'border-transparent text-[#7A6E64] hover:text-[#0E0C0A]'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>AI Studio Preview</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto flex-1 font-dmSans text-sm">
            {/* TAB 1: ASK & SEARCH */}
            {activeTab === 'chat' && (
              <div className="space-y-4">
                <p className="text-xs text-[#7A6E64]">
                  Ask any question about root canals, HydraFacial, dental implants, laser skin care, or recovery at Happy 32.
                </p>
                <form onSubmit={handleChatSubmit} className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="e.g. Is HydraFacial effective before a wedding?"
                      className="flex-1 bg-white border border-[#EDE8DF] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#B85C3A]"
                    />
                    <button
                      type="submit"
                      disabled={loadingChat}
                      className="px-5 py-2.5 bg-[#B85C3A] text-[#F8F4EE] rounded-xl font-medium text-xs hover:bg-[#0E0C0A] transition-colors flex items-center gap-2"
                    >
                      {loadingChat ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Ask'}
                    </button>
                  </div>
                </form>

                {loadingChat && (
                  <div className="p-8 text-center text-[#7A6E64] flex flex-col items-center gap-2">
                    <Loader2 className="w-6 h-6 animate-spin text-[#B85C3A]" />
                    <span className="text-xs">Consulting Dr. Himanshi's AI Assistant...</span>
                  </div>
                )}

                {chatResponse && (
                  <div className="bg-white p-5 rounded-xl border border-[#EDE8DF] space-y-3 mt-4">
                    <div className="font-cormorant text-lg font-medium text-[#0E0C0A]">
                      AI Clinical Guidance:
                    </div>
                    <div className="whitespace-pre-line text-[#3D362F] leading-relaxed text-xs md:text-sm">
                      {chatResponse}
                    </div>

                    {groundingSources.length > 0 && (
                      <div className="pt-3 border-t border-[#EDE8DF]">
                        <span className="text-[10px] font-medium uppercase tracking-wider text-[#A8854A] block mb-1">
                          Verified Sources:
                        </span>
                        <div className="flex flex-wrap gap-2 text-xs">
                          {groundingSources.map((chunk, idx) => (
                            <a
                              key={idx}
                              href={chunk.web?.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#B85C3A] hover:underline bg-[#EDE8DF]/50 px-2 py-0.5 rounded text-[11px]"
                            >
                              {chunk.web?.title || 'Grounding Reference'}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: ANALYZE PHOTO */}
            {activeTab === 'analyze' && (
              <div className="space-y-4">
                <p className="text-xs text-[#7A6E64]">
                  Upload a photo of your smile or skin concern to receive a preliminary aesthetic analysis and treatment recommendation.
                </p>

                <form onSubmit={handleAnalyzeSubmit} className="space-y-4">
                  <div className="border-2 border-dashed border-[#EDE8DF] rounded-xl p-6 text-center hover:border-[#A8854A] transition-colors bg-white cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    {imagePreview ? (
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src={imagePreview}
                          alt="Uploaded Preview"
                          className="max-h-48 rounded-lg object-contain border border-[#EDE8DF]"
                        />
                        <span className="text-xs text-[#B85C3A] font-medium">Click to replace photo</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-[#7A6E64]">
                        <Upload className="w-8 h-8 text-[#A8854A]" />
                        <span className="font-medium text-xs text-[#0E0C0A]">Click or drag to upload photo</span>
                        <span className="text-[10px]">Supports PNG, JPG, WEBP</span>
                      </div>
                    )}
                  </div>

                  {imagePreview && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-[#0E0C0A] mb-1">
                          Note / Specific Question:
                        </label>
                        <input
                          type="text"
                          value={analysisPrompt}
                          onChange={(e) => setAnalysisPrompt(e.target.value)}
                          className="w-full bg-white border border-[#EDE8DF] rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#B85C3A]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loadingAnalysis}
                        className="w-full py-3 bg-[#B85C3A] text-[#F8F4EE] rounded-xl font-medium text-xs hover:bg-[#0E0C0A] transition-colors flex items-center justify-center gap-2"
                      >
                        {loadingAnalysis ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Analyzing with Gemini 3.1 Pro...</span>
                          </>
                        ) : (
                          <span>Analyze Photo</span>
                        )}
                      </button>
                    </>
                  )}
                </form>

                {analysisResult && (
                  <div className="bg-white p-5 rounded-xl border border-[#EDE8DF] space-y-2 mt-4">
                    <span className="font-cormorant font-medium text-lg text-[#0E0C0A]">
                      Aesthetic & Dental Assessment:
                    </span>
                    <div className="whitespace-pre-line text-xs text-[#3D362F] leading-relaxed">
                      {analysisResult}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: GENERATE STUDIO PREVIEW */}
            {activeTab === 'generate' && (
              <div className="space-y-4">
                <p className="text-xs text-[#7A6E64]">
                  Generate high-quality AI visual concepts for smile transformations or studio aesthetics using Gemini 3.1 Flash Image.
                </p>

                <form onSubmit={handleGenerateSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#0E0C0A] mb-1">
                      Visual Prompt:
                    </label>
                    <textarea
                      value={genPrompt}
                      onChange={(e) => setGenPrompt(e.target.value)}
                      rows={2}
                      className="w-full bg-white border border-[#EDE8DF] rounded-xl p-3 text-xs focus:outline-none focus:border-[#B85C3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#0E0C0A] mb-1">
                      Aspect Ratio:
                    </label>
                    <div className="flex gap-2">
                      {['1:1', '4:3', '16:9', '3:4'].map((ratio) => (
                        <button
                          key={ratio}
                          type="button"
                          onClick={() => setGenAspectRatio(ratio)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                            genAspectRatio === ratio
                              ? 'bg-[#0E0C0A] text-[#F8F4EE] border-[#0E0C0A]'
                              : 'bg-white text-[#7A6E64] border-[#EDE8DF]'
                          }`}
                        >
                          {ratio}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loadingGen}
                    className="w-full py-3 bg-[#B85C3A] text-[#F8F4EE] rounded-xl font-medium text-xs hover:bg-[#0E0C0A] transition-colors flex items-center justify-center gap-2"
                  >
                    {loadingGen ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Generating AI Concept Image...</span>
                      </>
                    ) : (
                      <span>Generate Visual Preview</span>
                    )}
                  </button>
                </form>

                {generatedImage && (
                  <div className="bg-white p-4 rounded-xl border border-[#EDE8DF] flex flex-col items-center gap-3 mt-4">
                    <img
                      src={generatedImage}
                      alt="Generated Preview"
                      className="w-full max-h-72 object-contain rounded-lg border border-[#EDE8DF]"
                    />
                    <span className="text-[10px] text-[#7A6E64] uppercase tracking-wider">
                      Generated by Gemini 3.1 Flash Image
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Notice */}
          <div className="p-4 bg-[#EDE8DF]/60 border-t border-[#EDE8DF] text-[11px] text-[#7A6E64] text-center">
            AI recommendations are for informational & aesthetic preview purposes. Official diagnosis is provided in person by Dr. Himanshi Sawlani at Happy 32.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
