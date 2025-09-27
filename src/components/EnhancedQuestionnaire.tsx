import React, { useState, FC } from 'react';
import {
  ChevronRight, Check, Zap, Target, Palette, Users, TrendingUp,
  DollarSign, Brain, Package, Upload, MapPin, Heart, ShoppingBag
} from 'lucide-react';

// --- TYPE DEFINITIONS (The Foundation for an Error-Free Component) ---

// Defines the shape of the object that stores all user answers.
type Answers = {
  [key: number]: any;
};

// Defines the different shapes that an 'option' can have.
type BaseOption = { value: string; label: string };
type PositioningOption = BaseOption & { positioning: string };
type PreviewOption = BaseOption & { preview: string };

// A union of all possible option types.
type QuestionOption = BaseOption | PositioningOption | PreviewOption;

// A base interface with properties common to ALL questions.
interface BaseQuestion {
  id: number;
  category: string;
  title: string;
  question: string;
  icon: JSX.Element;
  followUp?: string;
  options?: QuestionOption[];
}

// Specific interfaces for each question type to ensure type safety.
interface ComprehensiveProductQuestion extends BaseQuestion {
  type: 'comprehensive_product';
  options?: never; // This type of question has no 'options' array.
}

interface AudienceProfilingQuestion extends BaseQuestion {
  type: 'audience_profiling';
  options?: never;
}

interface SingleChoiceQuestion extends BaseQuestion {
  type: 'single_choice';
  options: BaseOption[];
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple_choice';
  options: PositioningOption[];
  max_selections: number;
}

interface VisualChoiceQuestion extends BaseQuestion {
  type: 'visual_choice';
  options: PreviewOption[];
}

interface TextWithChoicesQuestion extends BaseQuestion {
  type: 'text_with_choices';
  options: BaseOption[];
  placeholder: string;
}

// A final union of all possible question structures.
type Question =
  | ComprehensiveProductQuestion
  | AudienceProfilingQuestion
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | VisualChoiceQuestion
  | TextWithChoicesQuestion;

// --- THE COMPONENT ---

const EnhancedQuestionnaire: FC = () => {
  // --- STATE MANAGEMENT (Now strictly typed) ---
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [isComplete, setIsComplete] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // --- DATA SOURCE (Strictly typed array of Questions) ---
  const questions: Question[] = [
    {
      id: 1,
      category: "Product Intelligence",
      title: "Product & Brand Assets",
      question: "Let's capture your product details for precise AI generation...",
      type: "comprehensive_product",
      icon: <Package className="w-6 h-6" />,
    },
    {
      id: 2,
      category: "Brand DNA",
      title: "Brand Personality",
      question: "At a networking event, your brand would be the one that...",
      type: "single_choice",
      icon: <Zap className="w-6 h-6" />,
      options: [
        { value: 'thought_leader', label: 'Everyone turns to for the latest industry insights' },
        { value: 'trusted_advisor', label: 'People seek out for reliable, proven solutions' },
        { value: 'creative_disruptor', label: 'Challenges conventions with bold, innovative ideas' },
        { value: 'empathetic_guide', label: 'Makes complex problems feel manageable' },
        { value: 'results_driver', label: 'Focuses on delivering measurable outcomes' }
      ]
    },
    {
      id: 3,
      category: "Target Audience Intelligence",
      title: "Customer Demographics & Psychology",
      question: "Your ideal customers are...",
      type: "audience_profiling",
      icon: <Users className="w-6 h-6" />,
    },
    {
      id: 4,
      category: "Value Proposition",
      title: "Problem & Solution",
      question: "The core problem your product solves is...",
      type: "text_with_choices",
      icon: <Target className="w-6 h-6" />,
      placeholder: "Describe the specific problem customers struggle with, your solution...",
      followUp: "What alternatives are customers currently using that fall short?",
      options: [
        { value: 'time_efficiency', label: 'Saves significant time' },
        { value: 'cost_reduction', label: 'Reduces costs measurably' },
        { value: 'quality_improvement', label: 'Improves quality/results' },
        { value: 'risk_mitigation', label: 'Reduces risk/uncertainty' },
        { value: 'experience_enhancement', label: 'Enhances user experience' }
      ]
    },
    {
      id: 5,
      category: "Customer Psychology",
      title: "Purchase Decision Process",
      question: "When customers decide to buy, they typically...",
      type: "single_choice",
      icon: <Brain className="w-6 h-6" />,
      options: [
        { value: 'high_involvement', label: 'Research extensively, compare options...' },
        { value: 'medium_involvement', label: 'Do moderate research but rely heavily on recommendations' },
        { value: 'low_involvement', label: 'Buy quickly based on emotion, impulse, or immediate need' }
      ]
    },
    {
      id: 6,
      category: "Competitive Landscape",
      title: "Market Position",
      question: "Compared to your main competitors, you're the...",
      type: "multiple_choice",
      icon: <TrendingUp className="w-6 h-6" />,
      max_selections: 2,
      options: [
        { value: 'premium_leader', label: 'Premium choice', positioning: 'Premium Quality Leader' },
        { value: 'innovative_challenger', label: 'Innovative disruptor', positioning: 'Innovation Leader' },
        { value: 'value_optimizer', label: 'Smart choice', positioning: 'Value Leader' },
        { value: 'specialist_expert', label: 'Specialized expert', positioning: 'Specialist Authority' },
        { value: 'accessible_alternative', label: 'Accessible alternative', positioning: 'Accessible Quality' }
      ],
      followUp: "What unique territory do you own that competitors cannot easily claim?"
    },
    {
      id: 7,
      category: "Visual Identity",
      title: "Brand Aesthetic",
      question: "Your brand's visual personality should feel...",
      type: "visual_choice",
      icon: <Palette className="w-6 h-6" />,
      options: [
        { value: 'premium_sophisticated', label: 'Premium & Sophisticated', preview: 'bg-gradient-to-br from-slate-900 to-slate-700 text-white' },
        { value: 'innovative_dynamic', label: 'Innovative & Dynamic', preview: 'bg-gradient-to-br from-purple-600 to-blue-600 text-white' },
        { value: 'trustworthy_professional', label: 'Trustworthy & Professional', preview: 'bg-gradient-to-br from-blue-700 to-blue-900 text-white' },
        { value: 'approachable_warm', label: 'Approachable & Warm', preview: 'bg-gradient-to-br from-orange-400 to-red-400 text-white' },
        { value: 'bold_confident', label: 'Bold & Confident', preview: 'bg-gradient-to-br from-red-600 to-pink-600 text-white' }
      ]
    },
    {
      id: 8,
      category: "Campaign Strategy",
      title: "Strategic Focus",
      question: "This campaign's primary mission is to...",
      type: "single_choice",
      icon: <DollarSign className="w-6 h-6" />,
      options: [
        { value: 'brand_awareness', label: 'Build brand recognition and market presence' },
        { value: 'lead_generation', label: 'Generate qualified leads and prospects' },
        { value: 'sales_conversion', label: 'Drive immediate sales and revenue' },
        { value: 'market_education', label: 'Educate market about solution/category' },
        { value: 'competitive_differentiation', label: 'Establish clear differentiation from competitors' }
      ],
      followUp: "What has worked best in your previous marketing efforts?"
    }
  ];

  // --- LOGIC & EVENT HANDLERS (Now fully type-safe) ---

  const currentQuestionData = questions[currentQuestion - 1];

  const handleResponse = (questionId: number, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));

    if (currentQuestionData?.type === 'text_with_choices' && typeof value.text === 'string' && value.text.length > 50 && !showFollowUp) {
      setShowFollowUp(true);
    }
  };

  const handleFieldChange = (questionId: number, fieldName: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {}),
        [fieldName]: value
      }
    }));
  };

  const handleMultiSelectChange = (questionId: number, fieldName: string, optionValue: string, maxSelections: number) => {
    const currentSelections = answers[questionId]?.[fieldName] || [];
    const isSelected = currentSelections.includes(optionValue);
    let newSelections;

    if (isSelected) {
      newSelections = currentSelections.filter((item: string) => item !== optionValue);
    } else if (currentSelections.length < maxSelections) {
      newSelections = [...currentSelections, optionValue];
    } else {
      return; // Max selections reached
    }
    handleFieldChange(questionId, fieldName, newSelections);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string | null;
        setUploadedImage(imageData ?? null);
        handleFieldChange(1, 'product_image', imageData ?? null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFollowUp(false);
    } else {
      // Final submission logic
      const productAssets = answers[1] || {};
      const audienceData = answers[3] || {};
      const enhancedAnswers = {
        answers: {
          1: productAssets.product_description || '',
          2: answers[2] || '',
          3: answers[5] || '',
          4: answers[4] || '',
          5: Array.isArray(answers[6]) ? answers[6].join(', ') : answers[6] || '',
          6: audienceData,
          7: answers[7] || '',
          8: answers[8] || '',
        },
        enhanced_data: {
          product_assets: {
            name: productAssets.product_name,
            category: productAssets.product_category,
            description: productAssets.product_description,
            image: productAssets.product_image,
            brand_colors: {
              primary: productAssets.primary_color || '#000000',
              secondary: productAssets.secondary_color || '#FFFFFF',
              accent: productAssets.accent_color || '#D4AF37'
            },
            typography: productAssets.brand_font
          },
          audience_intelligence: {
            demographics: {
              age_ranges: audienceData.age_ranges || [],
              income_levels: audienceData.income_levels || [],
            },
            psychographics: {
              core_values: audienceData.core_values || [],
            },
            behavioral: {
              research_behavior: audienceData.research_behavior,
              media_consumption: audienceData.media_consumption || []
            }
          },
          brand_strategy: {
            personality: answers[2],
            competitive_position: answers[6],
            visual_style: answers[7],
            campaign_objective: answers[8]
          },
          psychology_insights: {
            purchase_process: answers[5],
            value_proposition: answers[4]
          }
        }
      };
      console.log('💾 Saving enhanced answers:', enhancedAnswers);
      if (typeof window !== 'undefined') {
        localStorage.setItem('questionnaireAnswers', JSON.stringify(enhancedAnswers));
        localStorage.setItem('questionnaireCompleted', 'true');
        setIsComplete(true);
        setTimeout(() => {
          window.location.href = '/generate';
        }, 2000);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
      setShowFollowUp(false);
    }
  };

  const isFormValid = (): boolean => {
    if (!currentQuestionData) return false;
    const { id, type } = currentQuestionData;
    const currentAnswer = answers[id];

    switch (type) {
      case 'comprehensive_product':
        return !!(currentAnswer?.product_name && currentAnswer?.product_description && currentAnswer?.product_category);
      case 'audience_profiling':
        return !!(currentAnswer?.age_ranges?.length && currentAnswer?.income_levels?.length && currentAnswer?.core_values?.length);
      case 'multiple_choice':
        return !!(Array.isArray(currentAnswer) && currentAnswer.length > 0);
      case 'text_with_choices':
        return !!(currentAnswer?.text && currentAnswer?.impact);
      default:
        return !!currentAnswer;
    }
  };

  // --- RENDER LOGIC ---

  if (isComplete) {
    return (
      <main className="min-h-screen center-luxury" style={{ background: 'var(--surface-primary)' }}>
        <div className="text-center fade-in-luxury">
          <div className="w-32 h-32 rounded-full center-luxury mx-auto mb-8" style={{ background: 'linear-gradient(135deg, var(--brand-gold), #F4D03F)', boxShadow: '0 0 40px rgba(212, 175, 55, 0.3)' }}>
            <Check className="w-16 h-16" style={{ color: 'var(--brand-charcoal)' }} />
          </div>
          <h2 className="text-display mb-6" style={{ color: 'var(--text-primary)' }}>Strategic Intelligence Captured</h2>
          <p className="text-subheading mb-8" style={{ color: 'var(--text-secondary)' }}>Generating comprehensive marketing brief...</p>
        </div>
      </main>
    );
  }

  const renderQuestionInputs = () => {
    switch (currentQuestionData.type) {
      case 'comprehensive_product':
        return (
          <div className="space-y-8">
            {/* Product Name, Image, Colors, etc. */}
            <div className="space-y-3">
              <label className="text-subheading font-medium" style={{ color: 'var(--brand-gold)' }}>Product Name *</label>
              <input type="text" className="input-luxury w-full" placeholder="e.g., TaskMaster Pro" value={answers[1]?.product_name || ''} onChange={(e) => handleFieldChange(1, 'product_name', e.target.value)} />
            </div>
            {/* Image Upload */}
            <div className="space-y-3">
              <label className="text-subheading font-medium" style={{ color: 'var(--brand-gold)' }}>Product Image/Logo</label>
              <div className="border-2 border-dashed rounded-xl p-8 text-center transition-colors" style={{ borderColor: 'var(--surface-elevated)', background: 'var(--surface-secondary)' }}>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="product-image-upload" />
                <label htmlFor="product-image-upload" className="cursor-pointer">
                  {uploadedImage ? (
                    <img src={uploadedImage} alt="Product preview" className="w-32 h-32 object-cover rounded-lg mx-auto border-2" style={{ borderColor: 'var(--brand-gold)' }} />
                  ) : (
                    <div className="space-y-4"><Upload className="w-12 h-12 mx-auto" style={{ color: 'var(--text-tertiary)' }} /><p>Click to upload</p></div>
                  )}
                </label>
              </div>
            </div>
            {/* Color Pickers and other fields go here */}
            <div className="space-y-3">
              <label className="text-subheading font-medium" style={{ color: 'var(--brand-gold)' }}>Product Description *</label>
              <textarea className="input-luxury w-full" placeholder="Brief description..." value={answers[1]?.product_description || ''} onChange={(e) => handleFieldChange(1, 'product_description', e.target.value)} rows={4} />
            </div>
             <div className="space-y-3">
                <label className="text-subheading font-medium" style={{ color: 'var(--brand-gold)' }}>Specific Product Type *</label>
                <select className="input-luxury w-full" value={answers[1]?.product_category || ''} onChange={(e) => handleFieldChange(1, 'product_category', e.target.value)}>
                    <option value="">Select specific product type...</option>
                    <option value="saas_platform">SaaS/Software Platform</option>
                    <option value="mobile_app">Mobile Application</option>
                    <option value="skincare">Skincare Product</option>
                    {/* Add all other options */}
                </select>
            </div>
          </div>
        );

      case 'audience_profiling':
        return (
          <div className="space-y-10">
            {/* Age Groups */}
            <div className="space-y-3">
              <label className="text-subheading font-medium">Age Groups *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[{ value: "gen_z", label: "Gen Z (18-26)" }, { value: "millennial", label: "Millennials (27-42)" }, { value: "gen_x", label: "Gen X (43-58)" }, { value: "boomer", label: "Boomers (59+)" }].map(opt => (
                  <button key={opt.value} onClick={() => handleMultiSelectChange(3, 'age_ranges', opt.value, 4)} className={`choice-option ${answers[3]?.age_ranges?.includes(opt.value) ? 'selected' : ''}`}>{opt.label}</button>
                ))}
              </div>
            </div>
            {/* Income Brackets */}
            <div className="space-y-3">
              <label className="text-subheading font-medium">Income Brackets *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[{ value: "budget_conscious", label: "Budget-Conscious" }, { value: "middle_market", label: "Middle Market" }, { value: "affluent", label: "Affluent" }, { value: "luxury", label: "Luxury Market" }].map(opt => (
                  <button key={opt.value} onClick={() => handleMultiSelectChange(3, 'income_levels', opt.value, 4)} className={`choice-option ${answers[3]?.income_levels?.includes(opt.value) ? 'selected' : ''}`}>{opt.label}</button>
                ))}
              </div>
            </div>
            {/* Core Values */}
            <div className="space-y-3">
              <label className="text-subheading font-medium">They care most about... (select top 3) *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[{ value: "family_first", label: "Family" }, { value: "career_success", label: "Career" }, { value: "health_wellness", label: "Health" }, { value: "financial_security", label: "Finance" }].map(opt => (
                  <button key={opt.value} onClick={() => handleMultiSelectChange(3, 'core_values', opt.value, 3)} disabled={!answers[3]?.core_values?.includes(opt.value) && answers[3]?.core_values?.length >= 3} className={`choice-option ${answers[3]?.core_values?.includes(opt.value) ? 'selected' : ''}`}>{opt.label}</button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'single_choice':
        return (
          <div className="grid gap-4">
            {currentQuestionData.options.map((option) => (
              <button key={option.value} onClick={() => handleResponse(currentQuestionData.id, option.value)} className={`choice-option ${answers[currentQuestionData.id] === option.value ? 'selected' : ''}`}>
                {option.label}
              </button>
            ))}
          </div>
        );
      
      case 'multiple_choice':
        // TypeScript now knows that `option.positioning` is safe to access here.
        return (
          <div className="grid gap-4">
            {currentQuestionData.options.map((option) => (
              <button key={option.value} onClick={() => {
                  const currentSelections = answers[currentQuestionData.id] || [];
                  let newSelections;
                  if (currentSelections.includes(option.value)) {
                    newSelections = currentSelections.filter((i: string) => i !== option.value);
                  } else if (currentSelections.length < currentQuestionData.max_selections) {
                    newSelections = [...currentSelections, option.value];
                  } else {
                    return;
                  }
                  handleResponse(currentQuestionData.id, newSelections);
                }}
                className={`choice-option text-left ${answers[currentQuestionData.id]?.includes(option.value) ? 'selected' : ''}`}
              >
                <div className="font-semibold">{option.label}</div>
                <div className="text-caption">{option.positioning}</div>
              </button>
            ))}
          </div>
        );

      case 'visual_choice':
        // TypeScript now knows that `option.preview` is safe to access here.
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentQuestionData.options.map((option) => (
              <button key={option.value} onClick={() => handleResponse(currentQuestionData.id, option.value)} className={`visual-choice ${option.preview} ${answers[currentQuestionData.id] === option.value ? 'selected' : ''}`}>
                {option.label}
              </button>
            ))}
          </div>
        );

      case 'text_with_choices':
        return (
          <div className="space-y-8">
            <textarea
              className="input-luxury w-full"
              placeholder={currentQuestionData.placeholder}
              value={answers[currentQuestionData.id]?.text || ''}
              onChange={(e) => handleResponse(currentQuestionData.id, { ...(answers[currentQuestionData.id] || {}), text: e.target.value })}
              rows={4}
            />
            <div className="flex flex-wrap justify-center gap-4">
              {currentQuestionData.options.map((option) => (
                <button key={option.value} onClick={() => handleResponse(currentQuestionData.id, { ...(answers[currentQuestionData.id] || {}), impact: option.value })} className={`btn-ghost ${answers[currentQuestionData.id]?.impact === option.value ? 'selected-ghost' : ''}`}>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Question type not configured.</div>;
    }
  };

  return (
    <main className="min-h-screen center-luxury px-8" style={{ background: 'var(--surface-primary)' }}>
      <div className="container-luxury">
        {/* Header and Progress Bar */}
        <div className="text-center mb-16">
          <div className="flex-luxury justify-center mb-8">
            <div className="w-20 h-20 rounded-full center-luxury" style={{ background: 'linear-gradient(135deg, var(--brand-gold), #F4D03F)', boxShadow: 'var(--shadow-gold)' }}>
              <div style={{ color: 'var(--brand-charcoal)' }}>
                {currentQuestionData?.icon}
              </div>
            </div>
            <div className="ml-6 text-left">
              <h1 className="text-hero" style={{ color: 'var(--text-primary)' }}>{currentQuestionData?.category}</h1>
              <p className="text-subheading mt-2" style={{ color: 'var(--brand-gold)' }}>{currentQuestionData?.title}</p>
            </div>
          </div>
          <div className="max-w-lg mx-auto mb-8">
            <div className="flex justify-between text-caption mb-4" style={{ color: 'var(--text-tertiary)' }}>
              <span>Question {currentQuestion} of {questions.length}</span>
              <span>{Math.round((currentQuestion / questions.length) * 100)}% Complete</span>
            </div>
            <div className="progress-luxury"><div className="progress-fill" style={{ width: `${(currentQuestion / questions.length) * 100}%` }} /></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="card-question max-w-5xl mx-auto fade-in-luxury">
          <div className="text-center mb-12">
            <h2 className="text-title mb-6" style={{ color: 'var(--text-primary)' }}>{currentQuestionData?.question}</h2>
          </div>
          {renderQuestionInputs()}
          {showFollowUp && currentQuestionData?.followUp && (
            <div className="mt-8 p-6 rounded-xl fade-in-luxury" style={{ background: 'var(--brand-gold)', color: 'var(--brand-charcoal)' }}>
              <p className="text-body-large">{currentQuestionData.followUp}</p>
            </div>
          )}
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-16 pt-8" style={{ borderTop: `1px solid var(--surface-elevated)` }}>
            <button onClick={handlePrevious} disabled={currentQuestion === 1} className="btn-secondary" style={{ opacity: currentQuestion === 1 ? 0.4 : 1 }}>Previous</button>
            <button onClick={handleNext} disabled={!isFormValid()} className="btn-primary scale-luxury" style={{ opacity: !isFormValid() ? 0.5 : 1 }}>
              <span>{currentQuestion === questions.length ? 'Generate Brief' : 'Next Question'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EnhancedQuestionnaire;
