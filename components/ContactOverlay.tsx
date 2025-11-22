import React, { useEffect, useState } from 'react';
import { X, Send, Mail, AlertCircle } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const ContactOverlay: React.FC<Props> = ({ onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const apiKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
    if (!apiKey) {
      setIsSubmitting(false);
      setErrorMessage("Form is not configured correctly (missing access key). Please contact us directly by email.");
      console.error("VITE_WEB3FORMS_ACCESS_KEY is not set in .env");
      return;
    }

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: apiKey,
                name: formData.name,
                email: formData.email,
                message: formData.message,
                subject: `Studio Aether Inquiry: ${formData.name}`,
                botcheck: false, 
            }),
        });

        const result = await response.json();

        if (result.success) {
            setIsSent(true);
        } else {
            setErrorMessage(result.message || "Transmission failed. Please try again or contact us directly.");
        }
    } catch (error) {
        console.error("Form submission error:", error);
        setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-sm flex justify-center items-center p-4 animate-in fade-in duration-300 text-sand">
      <div className="w-full max-w-2xl bg-ink border border-stone-800 shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-stone-800">
           <div className="flex items-center gap-3">
             <Mail className="w-5 h-5 text-stone-400" />
             <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold">Contact Me</span>
           </div>
           <button onClick={onClose} className="group hover:text-white transition-colors border border-transparent hover:border-stone-700 p-2">
             <X className="w-5 h-5" />
           </button>
        </div>

        {/* Form Body */}
        <div className="p-8 md:p-12">
            {!isSent ? (
                <div className="space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-medium tracking-tight text-white">Initialize Contact</h2>
                        <p className="text-stone-400 font-mono text-sm">Send a secure message to the studio.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest text-stone-500">Identity / Name</label>
                                <input 
                                  required 
                                  type="text" 
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  className="w-full bg-stone-900/50 border border-stone-800 focus:border-sand outline-none p-4 text-sm font-mono text-white transition-colors" 
                                  placeholder="John Doe" 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest text-stone-500">Return Address / Email</label>
                                <input 
                                  required 
                                  type="email" 
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  className="w-full bg-stone-900/50 border border-stone-800 focus:border-sand outline-none p-4 text-sm font-mono text-white transition-colors" 
                                  placeholder="john@example.com" 
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-stone-500">Payload / Message</label>
                            <textarea 
                              required 
                              rows={6} 
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              className="w-full bg-stone-900/50 border border-stone-800 focus:border-sand outline-none p-4 text-sm font-mono text-white transition-colors resize-none" 
                              placeholder="Describe your project parameters..."
                            ></textarea>
                        </div>

                        {errorMessage && (
                            <div className="flex items-center gap-2 text-red-400 text-xs font-mono bg-red-900/20 p-3 border border-red-900/50">
                                <AlertCircle className="w-4 h-4" />
                                <span>{errorMessage}</span>
                            </div>
                        )}

                        <div className="flex justify-end pt-4">
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="bg-sand text-ink px-8 py-4 font-mono text-xs uppercase font-bold tracking-widest hover:bg-white transition-colors flex items-center gap-3 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Transmitting...' : 'Execute Send'}
                                {!isSubmitting && <Send className="w-4 h-4" />}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="py-20 flex flex-col items-center text-center space-y-6 animate-in fade-in duration-500">
                    <div className="w-16 h-16 bg-sand text-ink flex items-center justify-center rounded-none">
                        <Send className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-medium text-white">Transmission Received</h3>
                    <p className="text-stone-400 font-mono text-sm max-w-md">
                        Message sent successfully. We will respond shortly.
                    </p>
                    <button 
                        onClick={() => {
                            onClose();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }} 
                        className="mt-8 border border-stone-700 text-stone-400 px-6 py-3 font-mono text-xs uppercase hover:border-sand hover:text-sand transition-colors"
                    >
                        Home
                    </button>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};