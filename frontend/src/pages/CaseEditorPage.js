import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  Fingerprint, LayoutDashboard, FileText, Users, BarChart3, 
  LogOut, Save, ArrowLeft, Plus, Trash2, GripVertical, Check, DollarSign, 
  X, AlertTriangle, Shield, Scale, Radio, Gavel, FileWarning, Brain
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { useAuth } from '../contexts/AuthContext';
import ImageUpload from '../components/ImageUpload';
import axios from 'axios';
import { toast } from 'sonner';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Crime Type Classifications
const CRIME_TYPES = {
  'HOM': { name: 'Homicide', threat_default: 'high' },
  'CYB': { name: 'Cybercrime', threat_default: 'moderate' },
  'TRF': { name: 'Trafficking', threat_default: 'critical' },
  'FIN': { name: 'Financial Crimes', threat_default: 'moderate' },
  'TER': { name: 'Domestic Terrorism', threat_default: 'critical' },
  'KID': { name: 'Kidnapping', threat_default: 'critical' },
  'COR': { name: 'Corruption', threat_default: 'high' },
  'NAR': { name: 'Narcotics', threat_default: 'high' },
  'ORG': { name: 'Organized Crime', threat_default: 'high' }
};

const THREAT_LEVELS = ['low', 'moderate', 'high', 'critical'];
const CASE_LENGTHS = ['short', 'standard', 'major'];
const US_STATES = ['Illinois', 'California', 'New York', 'Texas', 'Florida', 'Ohio', 'Michigan', 'Pennsylvania', 'Georgia', 'Arizona', 'Nevada', 'Virginia', 'Washington'];

// Suspect personality types
const PERSONALITY_TYPES = ['defensive', 'cooperative', 'hostile', 'calculating'];

// Evidence categories and types
const EVIDENCE_CATEGORIES = ['physical', 'digital', 'financial', 'behavioral', 'witness'];
const EVIDENCE_TYPES = ['dna', 'fingerprint', 'ballistics', 'metadata', 'transaction', 'statement', 'photograph', 'document', 'generic'];

// Procedural violations
const PROCEDURAL_VIOLATIONS = [
  { value: 'illegal_search', label: 'Illegal Search' },
  { value: 'miranda_failure', label: 'Miranda Failure' },
  { value: 'evidence_contamination', label: 'Evidence Contamination' },
  { value: 'unauthorized_force', label: 'Unauthorized Force' },
  { value: 'premature_arrest', label: 'Premature Arrest' },
  { value: 'witness_coercion', label: 'Witness Coercion' }
];

// Legal requirements
const LEGAL_REQUIREMENTS = [
  { value: '', label: 'None' },
  { value: 'warrant', label: 'Warrant Required' },
  { value: 'miranda', label: 'Miranda Required' },
  { value: 'consent', label: 'Consent Required' }
];

// Scene types
const SCENE_TYPES = ['investigation', 'crime_scene', 'evidence_lab', 'interrogation', 'briefing', 'tactical', 'courtroom'];
const AMBIENT_AUDIO = ['office', 'outdoor', 'rain', 'sirens', 'lab', 'courtroom'];
const CAMERA_STYLES = ['standard', 'dramatic', 'surveillance', 'documentary'];

// Ending types
const ENDING_TYPES = [
  { value: 'CLOSED', label: 'CLOSED (Successful)', color: 'emerald' },
  { value: 'DISMISSED', label: 'DISMISSED (Failed)', color: 'amber' },
  { value: 'COMPROMISED', label: 'COMPROMISED (Procedural)', color: 'red' },
  { value: 'ESCALATED', label: 'ESCALATED (Major Case)', color: 'blue' }
];

// Risk flag levels
const RISK_FLAGS = ['none', 'low', 'medium', 'high'];
const MAX_PROCEDURAL_RISK = ['low', 'medium', 'high', 'critical'];

export default function CaseEditorPage() {
  const { caseId } = useParams();
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const isNew = caseId === 'new' || !caseId;
  
  const [saving, setSaving] = useState(false);
  const [pageLoading, setPageLoading] = useState(!isNew);
  const [caseData, setCaseData] = useState({
    case_id: '',
    case_type: 'HOM',
    title: '',
    location_county: '',
    location_state: 'Illinois',
    victim_overview: '',
    victim_photo_url: null,
    summary: '',
    difficulty: 2,
    time_limit_minutes: 15,
    tags: [],
    suspects: [],
    scenes: [],
    clues: [],
    endings: [
      { 
        id: crypto.randomUUID(), 
        type: 'CLOSED', 
        title: 'Case Closed', 
        narration: '', 
        cp_base: 35, 
        cp_modifiers: {}, 
        mugshot_url: null,
        min_conviction_probability: 70,
        max_procedural_risk: 'high',
        required_evidence_count: 3,
        case_file_photo_url: null
      },
      { 
        id: crypto.randomUUID(), 
        type: 'DISMISSED', 
        title: 'Case Dismissed', 
        narration: '', 
        cp_base: 10, 
        cp_modifiers: {}, 
        mugshot_url: null,
        min_conviction_probability: 0,
        max_procedural_risk: 'critical',
        required_evidence_count: 0,
        case_file_photo_url: null
      },
      { 
        id: crypto.randomUUID(), 
        type: 'COMPROMISED', 
        title: 'Case Compromised', 
        narration: '', 
        cp_base: 5, 
        cp_modifiers: {}, 
        mugshot_url: null,
        min_conviction_probability: 0,
        max_procedural_risk: 'low',
        required_evidence_count: 0,
        case_file_photo_url: null
      },
      { 
        id: crypto.randomUUID(), 
        type: 'ESCALATED', 
        title: 'Case Escalated', 
        narration: '', 
        cp_base: 50, 
        cp_modifiers: {}, 
        mugshot_url: null,
        min_conviction_probability: 85,
        max_procedural_risk: 'medium',
        required_evidence_count: 5,
        case_file_photo_url: null
      }
    ],
    published: false,
    patch_notes: [],
    bonus_files: [],
    // New hyper-realistic fields
    crime_classification: 'Homicide',
    threat_level: 'high',
    jurisdiction_note: '',
    case_length: 'standard',
    conviction_threshold: 70,
    max_procedural_violations: 3
  });

  useEffect(() => {
    if (!token) return;
    
    if (!isNew && caseId) {
      fetchCase();
    } else {
      setPageLoading(false);
    }
  }, [token, isNew, caseId]);

  const fetchCase = async () => {
    setPageLoading(true);
    try {
      const response = await axios.get(`${API_URL}/owner/cases/${caseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Merge with defaults to ensure all new fields exist
      setCaseData(prev => ({
        ...prev,
        ...response.data,
        // Ensure endings have all required fields
        endings: (response.data.endings || prev.endings).map(ending => ({
          min_conviction_probability: 0,
          max_procedural_risk: 'critical',
          required_evidence_count: 0,
          case_file_photo_url: null,
          ...ending
        })),
        // Ensure suspects have all required fields
        suspects: (response.data.suspects || []).map(suspect => ({
          personality_type: 'defensive',
          breaking_point: 3,
          lawyer_threshold: 2,
          cooperation_level: 50,
          ...suspect
        })),
        // Ensure clues have all required fields
        clues: (response.data.clues || []).map(clue => ({
          evidence_category: 'physical',
          evidence_type: 'generic',
          chain_of_custody: true,
          legally_obtained: true,
          evidence_strength: 10,
          requires_warrant: false,
          requires_consent: false,
          ...clue
        })),
        // Ensure scenes have all required fields
        scenes: (response.data.scenes || []).map(scene => ({
          scene_type: 'investigation',
          ambient_audio: 'office',
          camera_style: 'standard',
          ...scene,
          choices: (scene.choices || []).map(choice => ({
            conviction_delta: 0,
            evidence_strength_delta: 0,
            procedural_violation: null,
            legal_requirement: null,
            ...choice
          }))
        }))
      }));
    } catch (error) {
      toast.error('Failed to load case');
      navigate('/owner/cases');
    } finally {
      setPageLoading(false);
    }
  };

  const saveCase = async () => {
    setSaving(true);
    try {
      if (isNew) {
        await axios.post(`${API_URL}/owner/cases`, caseData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Case created');
      } else {
        await axios.put(`${API_URL}/owner/cases/${caseId}`, caseData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Case saved');
      }
      navigate('/owner/cases');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to save case');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field, value) => {
    setCaseData(prev => ({ ...prev, [field]: value }));
  };

  // Auto-update crime classification when case type changes
  const updateCaseType = (type) => {
    const typeInfo = CRIME_TYPES[type];
    setCaseData(prev => ({
      ...prev,
      case_type: type,
      crime_classification: typeInfo?.name || type,
      threat_level: typeInfo?.threat_default || 'moderate'
    }));
  };

  // Suspect management
  const addSuspect = () => {
    const newSuspect = {
      id: crypto.randomUUID(),
      name: '',
      age: 30,
      role: '',
      motive_angle: '',
      alibi_summary: '',
      risk_notes: '',
      is_guilty: false,
      portrait_url: null,
      // New interrogation fields
      personality_type: 'defensive',
      breaking_point: 3,
      lawyer_threshold: 2,
      cooperation_level: 50
    };
    setCaseData(prev => ({ ...prev, suspects: [...prev.suspects, newSuspect] }));
  };

  const updateSuspect = (index, field, value) => {
    const newSuspects = [...caseData.suspects];
    newSuspects[index] = { ...newSuspects[index], [field]: value };
    setCaseData(prev => ({ ...prev, suspects: newSuspects }));
  };

  const removeSuspect = (index) => {
    setCaseData(prev => ({ ...prev, suspects: prev.suspects.filter((_, i) => i !== index) }));
  };

  // Scene management
  const addScene = () => {
    const newScene = {
      id: `S${caseData.scenes.length}`,
      order: caseData.scenes.length,
      title: '',
      narration: '',
      is_interview_scene: false,
      is_accusation_scene: false,
      choices: [],
      media_urls: [],
      // New CGI scene fields
      scene_type: 'investigation',
      ambient_audio: 'office',
      camera_style: 'standard'
    };
    setCaseData(prev => ({ ...prev, scenes: [...prev.scenes, newScene] }));
  };

  const updateScene = (index, field, value) => {
    const newScenes = [...caseData.scenes];
    newScenes[index] = { ...newScenes[index], [field]: value };
    setCaseData(prev => ({ ...prev, scenes: newScenes }));
  };

  const removeScene = (index) => {
    setCaseData(prev => ({ ...prev, scenes: prev.scenes.filter((_, i) => i !== index) }));
  };

  const addChoice = (sceneIndex) => {
    const newChoice = {
      id: crypto.randomUUID(),
      text: '',
      score_delta: 0,
      add_clues: [],
      require_clues: [],
      next_scene_id: '',
      risk_flag: 'none',
      // New tracking fields
      conviction_delta: 0,
      evidence_strength_delta: 0,
      procedural_violation: null,
      legal_requirement: null
    };
    const newScenes = [...caseData.scenes];
    newScenes[sceneIndex].choices = [...newScenes[sceneIndex].choices, newChoice];
    setCaseData(prev => ({ ...prev, scenes: newScenes }));
  };

  const updateChoice = (sceneIndex, choiceIndex, field, value) => {
    const newScenes = [...caseData.scenes];
    newScenes[sceneIndex].choices[choiceIndex] = {
      ...newScenes[sceneIndex].choices[choiceIndex],
      [field]: value
    };
    setCaseData(prev => ({ ...prev, scenes: newScenes }));
  };

  const removeChoice = (sceneIndex, choiceIndex) => {
    const newScenes = [...caseData.scenes];
    newScenes[sceneIndex].choices = newScenes[sceneIndex].choices.filter((_, i) => i !== choiceIndex);
    setCaseData(prev => ({ ...prev, scenes: newScenes }));
  };

  // Clue management with enhanced evidence system
  const addClue = () => {
    const newClue = {
      id: crypto.randomUUID(),
      label: '',
      description: '',
      load_bearing: false,
      misdirection: false,
      image_url: null,
      // New evidence system fields
      evidence_category: 'physical',
      evidence_type: 'generic',
      chain_of_custody: true,
      legally_obtained: true,
      evidence_strength: 10,
      requires_warrant: false,
      requires_consent: false
    };
    setCaseData(prev => ({ ...prev, clues: [...prev.clues, newClue] }));
  };

  const updateClue = (index, field, value) => {
    const newClues = [...caseData.clues];
    newClues[index] = { ...newClues[index], [field]: value };
    setCaseData(prev => ({ ...prev, clues: newClues }));
  };

  const removeClue = (index) => {
    setCaseData(prev => ({ ...prev, clues: prev.clues.filter((_, i) => i !== index) }));
  };

  // Ending management
  const updateEnding = (index, field, value) => {
    const newEndings = [...caseData.endings];
    newEndings[index] = { ...newEndings[index], [field]: value };
    setCaseData(prev => ({ ...prev, endings: newEndings }));
  };

  const handleLogout = () => {
    logout();
    navigate('/owner/login');
  };

  // Get clue options for choice add_clues and require_clues
  const getClueOptions = () => {
    return caseData.clues.map(clue => ({
      value: clue.id,
      label: clue.label || `Clue ${clue.id.slice(0, 8)}`
    }));
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <Fingerprint className="w-12 h-12 text-zinc-600 mx-auto animate-pulse" />
          <p className="text-zinc-500 mt-4 font-mono text-sm">LOADING CASE...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/30 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <Link to="/owner/dashboard" className="flex items-center gap-3">
            <Fingerprint className="w-6 h-6 text-white" />
            <span className="font-heading text-lg tracking-widest text-white">CASE FILES</span>
          </Link>
          <div className="mt-2 font-mono text-xs text-red-500">OWNER PORTAL</div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <Link
              to="/owner/dashboard"
              className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 font-mono text-sm uppercase tracking-widest transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              to="/owner/cases"
              className="flex items-center gap-3 px-4 py-3 text-white bg-zinc-800 font-mono text-sm uppercase tracking-widest"
            >
              <FileText className="w-4 h-4" />
              Cases
            </Link>
            <Link
              to="/owner/analytics"
              className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 font-mono text-sm uppercase tracking-widest transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Link>
            <Link
              to="/owner/users"
              className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 font-mono text-sm uppercase tracking-widest transition-colors"
            >
              <Users className="w-4 h-4" />
              Players
            </Link>
            <Link
              to="/owner/revenue"
              className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 font-mono text-sm uppercase tracking-widest transition-colors"
            >
              <DollarSign className="w-4 h-4" />
              Revenue
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800/50"
          >
            <LogOut className="w-4 h-4 mr-3" />
            <span className="font-mono text-xs uppercase tracking-widest">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/owner/cases')}
                className="text-zinc-400 hover:text-white p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="font-heading text-3xl text-white uppercase tracking-wide">
                  {isNew ? 'Create Case' : 'Edit Case'}
                </h1>
                <p className="text-zinc-500 font-mono text-sm mt-1">
                  {caseData.case_id || 'New case'} • {CRIME_TYPES[caseData.case_type]?.name || caseData.case_type}
                </p>
              </div>
            </div>
            <Button
              onClick={saveCase}
              disabled={saving}
              className="bg-emerald-600 text-white hover:bg-emerald-500 rounded-none uppercase tracking-widest font-bold text-xs h-10 px-6"
              data-testid="save-case-btn"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Case'}
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="header" className="w-full">
            <TabsList className="bg-zinc-900 border border-zinc-800 rounded-none p-1 mb-6 flex-wrap">
              <TabsTrigger value="header" className="rounded-none data-[state=active]:bg-zinc-800 uppercase font-mono text-xs">
                Header
              </TabsTrigger>
              <TabsTrigger value="suspects" className="rounded-none data-[state=active]:bg-zinc-800 uppercase font-mono text-xs">
                Suspects ({caseData.suspects.length})
              </TabsTrigger>
              <TabsTrigger value="scenes" className="rounded-none data-[state=active]:bg-zinc-800 uppercase font-mono text-xs">
                Scenes ({caseData.scenes.length})
              </TabsTrigger>
              <TabsTrigger value="clues" className="rounded-none data-[state=active]:bg-zinc-800 uppercase font-mono text-xs">
                Evidence ({caseData.clues.length})
              </TabsTrigger>
              <TabsTrigger value="endings" className="rounded-none data-[state=active]:bg-zinc-800 uppercase font-mono text-xs">
                Endings
              </TabsTrigger>
            </TabsList>

            {/* Header Tab */}
            <TabsContent value="header" className="mt-0 space-y-6">
              {/* Case Identification */}
              <div className="p-4 border border-zinc-800 bg-zinc-900/30">
                <h3 className="font-mono text-xs text-emerald-500 mb-4 tracking-widest">CASE IDENTIFICATION</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-zinc-400 uppercase tracking-widest text-xs">Case ID</Label>
                    <Input
                      value={caseData.case_id}
                      onChange={(e) => updateField('case_id', e.target.value)}
                      placeholder="FBI-HOM-24-001"
                      className="bg-zinc-950 border-zinc-800 rounded-none text-white"
                      data-testid="case-id-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-400 uppercase tracking-widest text-xs">Case Type</Label>
                    <Select value={caseData.case_type} onValueChange={updateCaseType}>
                      <SelectTrigger className="bg-zinc-950 border-zinc-800 rounded-none text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800">
                        {Object.entries(CRIME_TYPES).map(([code, info]) => (
                          <SelectItem key={code} value={code}>{code} - {info.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-400 uppercase tracking-widest text-xs">Threat Level</Label>
                    <Select value={caseData.threat_level} onValueChange={(v) => updateField('threat_level', v)}>
                      <SelectTrigger className="bg-zinc-950 border-zinc-800 rounded-none text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800">
                        {THREAT_LEVELS.map(level => (
                          <SelectItem key={level} value={level} className="uppercase">{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Case Title */}
              <div className="space-y-2">
                <Label className="text-zinc-400 uppercase tracking-widest text-xs">Case Title</Label>
                <Input
                  value={caseData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="The Riverside Conspiracy"
                  className="bg-zinc-900 border-zinc-800 rounded-none text-white text-lg"
                  data-testid="case-title-input"
                />
              </div>

              {/* Location */}
              <div className="p-4 border border-zinc-800 bg-zinc-900/30">
                <h3 className="font-mono text-xs text-emerald-500 mb-4 tracking-widest">JURISDICTION</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-zinc-400 uppercase tracking-widest text-xs">County</Label>
                    <Input
                      value={caseData.location_county}
                      onChange={(e) => updateField('location_county', e.target.value)}
                      placeholder="Cook"
                      className="bg-zinc-950 border-zinc-800 rounded-none text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-400 uppercase tracking-widest text-xs">State</Label>
                    <Select value={caseData.location_state} onValueChange={(v) => updateField('location_state', v)}>
                      <SelectTrigger className="bg-zinc-950 border-zinc-800 rounded-none text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800">
                        {US_STATES.map(state => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-400 uppercase tracking-widest text-xs">Jurisdiction Note</Label>
                    <Input
                      value={caseData.jurisdiction_note}
                      onChange={(e) => updateField('jurisdiction_note', e.target.value)}
                      placeholder="Federal jurisdiction applies"
                      className="bg-zinc-950 border-zinc-800 rounded-none text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Victim */}
              <div className="p-4 border border-zinc-800 bg-zinc-900/30">
                <h3 className="font-mono text-xs text-emerald-500 mb-4 tracking-widest">VICTIM INFORMATION</h3>
                <div className="flex gap-6">
                  <ImageUpload
                    value={caseData.victim_photo_url}
                    onChange={(url) => updateField('victim_photo_url', url)}
                    token={token}
                    label="Victim Photo"
                    previewSize="medium"
                  />
                  <Textarea
                    value={caseData.victim_overview}
                    onChange={(e) => updateField('victim_overview', e.target.value)}
                    placeholder="Brief description of the victim (name, age, occupation, circumstances)..."
                    className="bg-zinc-950 border-zinc-800 rounded-none text-white h-32 flex-1"
                  />
                </div>
              </div>

              {/* Case Parameters */}
              <div className="p-4 border border-zinc-800 bg-zinc-900/30">
                <h3 className="font-mono text-xs text-emerald-500 mb-4 tracking-widest">CASE PARAMETERS</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-zinc-400 uppercase tracking-widest text-xs">Difficulty (1-5)</Label>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      value={caseData.difficulty}
                      onChange={(e) => updateField('difficulty', parseInt(e.target.value))}
                      className="bg-zinc-950 border-zinc-800 rounded-none text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-400 uppercase tracking-widest text-xs">Time Limit (min)</Label>
                    <Input
                      type="number"
                      min={5}
                      max={60}
                      value={caseData.time_limit_minutes}
                      onChange={(e) => updateField('time_limit_minutes', parseInt(e.target.value))}
                      className="bg-zinc-950 border-zinc-800 rounded-none text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-400 uppercase tracking-widest text-xs">Case Length</Label>
                    <Select value={caseData.case_length} onValueChange={(v) => updateField('case_length', v)}>
                      <SelectTrigger className="bg-zinc-950 border-zinc-800 rounded-none text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800">
                        {CASE_LENGTHS.map(length => (
                          <SelectItem key={length} value={length} className="capitalize">{length}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Conviction Requirements */}
              <div className="p-4 border border-amber-800/50 bg-amber-950/20">
                <h3 className="font-mono text-xs text-amber-500 mb-4 tracking-widest flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  CONVICTION REQUIREMENTS
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-zinc-400 uppercase tracking-widest text-xs">Conviction Threshold (%)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={caseData.conviction_threshold}
                      onChange={(e) => updateField('conviction_threshold', parseInt(e.target.value))}
                      className="bg-zinc-950 border-zinc-800 rounded-none text-white"
                    />
                    <p className="text-xs text-zinc-500">Minimum conviction probability for CLOSED ending</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-400 uppercase tracking-widest text-xs">Max Procedural Violations</Label>
                    <Input
                      type="number"
                      min={1}
                      max={10}
                      value={caseData.max_procedural_violations}
                      onChange={(e) => updateField('max_procedural_violations', parseInt(e.target.value))}
                      className="bg-zinc-950 border-zinc-800 rounded-none text-white"
                    />
                    <p className="text-xs text-zinc-500">Violations before case is COMPROMISED</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Suspects Tab */}
            <TabsContent value="suspects" className="mt-0 space-y-4">
              <div className="flex items-center justify-between">
                <Button
                  onClick={addSuspect}
                  className="bg-zinc-800 text-white hover:bg-zinc-700 rounded-none uppercase tracking-widest text-xs"
                  data-testid="add-suspect-btn"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Suspect
                </Button>
                <p className="text-zinc-500 text-xs font-mono">Enhanced with interrogation AI parameters</p>
              </div>

              {caseData.suspects.map((suspect, index) => (
                <div key={suspect.id} className="p-6 border border-zinc-800 bg-zinc-900/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-zinc-500">SUSPECT #{index + 1}</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={suspect.is_guilty}
                          onCheckedChange={(v) => updateSuspect(index, 'is_guilty', v)}
                        />
                        <Label className="text-xs text-red-400">GUILTY</Label>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => removeSuspect(index)}
                        className="text-zinc-400 hover:text-red-500 h-8 w-8 p-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex gap-6">
                    <ImageUpload
                      value={suspect.portrait_url}
                      onChange={(url) => updateSuspect(index, 'portrait_url', url)}
                      token={token}
                      label="Portrait"
                      previewSize="medium"
                    />
                    
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <Input
                          value={suspect.name}
                          onChange={(e) => updateSuspect(index, 'name', e.target.value)}
                          placeholder="Full Name"
                          className="bg-zinc-950 border-zinc-800 rounded-none text-white"
                        />
                        <Input
                          type="number"
                          value={suspect.age}
                          onChange={(e) => updateSuspect(index, 'age', parseInt(e.target.value))}
                          placeholder="Age"
                          className="bg-zinc-950 border-zinc-800 rounded-none text-white"
                        />
                        <Input
                          value={suspect.role}
                          onChange={(e) => updateSuspect(index, 'role', e.target.value)}
                          placeholder="Role/Relationship"
                          className="bg-zinc-950 border-zinc-800 rounded-none text-white"
                        />
                      </div>
                      
                      <Textarea
                        value={suspect.motive_angle}
                        onChange={(e) => updateSuspect(index, 'motive_angle', e.target.value)}
                        placeholder="Potential motive..."
                        className="bg-zinc-950 border-zinc-800 rounded-none text-white h-16"
                      />
                      
                      <Textarea
                        value={suspect.alibi_summary}
                        onChange={(e) => updateSuspect(index, 'alibi_summary', e.target.value)}
                        placeholder="Alibi details..."
                        className="bg-zinc-950 border-zinc-800 rounded-none text-white h-16"
                      />
                    </div>
                  </div>

                  {/* Interrogation AI Parameters */}
                  <div className="pt-4 border-t border-zinc-800">
                    <h4 className="font-mono text-xs text-blue-400 mb-3 flex items-center gap-2">
                      <Brain className="w-3 h-3" />
                      INTERROGATION AI PARAMETERS
                    </h4>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label className="text-zinc-500 text-xs">Personality Type</Label>
                        <Select 
                          value={suspect.personality_type || 'defensive'} 
                          onValueChange={(v) => updateSuspect(index, 'personality_type', v)}
                        >
                          <SelectTrigger className="bg-zinc-950 border-zinc-800 rounded-none text-white h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border-zinc-800">
                            {PERSONALITY_TYPES.map(type => (
                              <SelectItem key={type} value={type} className="capitalize">{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-zinc-500 text-xs">Breaking Point</Label>
                        <Input
                          type="number"
                          min={1}
                          max={10}
                          value={suspect.breaking_point || 3}
                          onChange={(e) => updateSuspect(index, 'breaking_point', parseInt(e.target.value))}
                          className="bg-zinc-950 border-zinc-800 rounded-none text-white h-8 text-xs"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-zinc-500 text-xs">Lawyer Threshold</Label>
                        <Input
                          type="number"
                          min={1}
                          max={5}
                          value={suspect.lawyer_threshold || 2}
                          onChange={(e) => updateSuspect(index, 'lawyer_threshold', parseInt(e.target.value))}
                          className="bg-zinc-950 border-zinc-800 rounded-none text-white h-8 text-xs"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-zinc-500 text-xs">Cooperation (0-100)</Label>
                        <Input
                          type="number"
                          min={0}
                          max={100}
                          value={suspect.cooperation_level || 50}
                          onChange={(e) => updateSuspect(index, 'cooperation_level', parseInt(e.target.value))}
                          className="bg-zinc-950 border-zinc-800 rounded-none text-white h-8 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* Scenes Tab */}
            <TabsContent value="scenes" className="mt-0 space-y-4">
              <div className="flex items-center justify-between">
                <Button
                  onClick={addScene}
                  className="bg-zinc-800 text-white hover:bg-zinc-700 rounded-none uppercase tracking-widest text-xs"
                  data-testid="add-scene-btn"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Scene
                </Button>
                <p className="text-zinc-500 text-xs font-mono">Enhanced with CGI parameters</p>
              </div>

              {caseData.scenes.map((scene, sceneIndex) => (
                <div key={scene.id} className="p-6 border border-zinc-800 bg-zinc-900/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-4 h-4 text-zinc-600" />
                      <span className="font-mono text-emerald-500">SCENE {scene.id}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={scene.is_interview_scene}
                          onCheckedChange={(v) => updateScene(sceneIndex, 'is_interview_scene', v)}
                        />
                        <Label className="text-xs text-zinc-400">Interview</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={scene.is_accusation_scene}
                          onCheckedChange={(v) => updateScene(sceneIndex, 'is_accusation_scene', v)}
                        />
                        <Label className="text-xs text-zinc-400">Accusation</Label>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => removeScene(sceneIndex)}
                        className="text-zinc-400 hover:text-red-500 h-8 w-8 p-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <Input
                    value={scene.title}
                    onChange={(e) => updateScene(sceneIndex, 'title', e.target.value)}
                    placeholder="Scene Title"
                    className="bg-zinc-950 border-zinc-800 rounded-none text-white"
                  />

                  {/* CGI Scene Parameters */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-zinc-500 text-xs">Scene Type</Label>
                      <Select 
                        value={scene.scene_type || 'investigation'} 
                        onValueChange={(v) => updateScene(sceneIndex, 'scene_type', v)}
                      >
                        <SelectTrigger className="bg-zinc-950 border-zinc-800 rounded-none text-white h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800">
                          {SCENE_TYPES.map(type => (
                            <SelectItem key={type} value={type} className="capitalize">{type.replace('_', ' ')}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-500 text-xs">Ambient Audio</Label>
                      <Select 
                        value={scene.ambient_audio || 'office'} 
                        onValueChange={(v) => updateScene(sceneIndex, 'ambient_audio', v)}
                      >
                        <SelectTrigger className="bg-zinc-950 border-zinc-800 rounded-none text-white h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800">
                          {AMBIENT_AUDIO.map(audio => (
                            <SelectItem key={audio} value={audio} className="capitalize">{audio}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-500 text-xs">Camera Style</Label>
                      <Select 
                        value={scene.camera_style || 'standard'} 
                        onValueChange={(v) => updateScene(sceneIndex, 'camera_style', v)}
                      >
                        <SelectTrigger className="bg-zinc-950 border-zinc-800 rounded-none text-white h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800">
                          {CAMERA_STYLES.map(style => (
                            <SelectItem key={style} value={style} className="capitalize">{style}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Textarea
                      value={scene.narration}
                      onChange={(e) => updateScene(sceneIndex, 'narration', e.target.value)}
                      placeholder="Scene narration (90-160 words)..."
                      className="bg-zinc-950 border-zinc-800 rounded-none text-white h-32 font-typewriter"
                    />
                    <div className="text-xs text-zinc-500 text-right">
                      {scene.narration.split(/\s+/).filter(w => w).length} words
                    </div>
                  </div>

                  {/* Scene Media Upload */}
                  <div className="space-y-2 pt-4 border-t border-zinc-800">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-zinc-500">SCENE MEDIA (Crime Scene Photos)</span>
                      <Button
                        type="button"
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.onchange = async (e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            if (file.size > 5 * 1024 * 1024) {
                              toast.error('Image must be less than 5MB');
                              return;
                            }
                            try {
                              const formData = new FormData();
                              formData.append('file', file);
                              const response = await axios.post(`${API_URL}/owner/upload`, formData, {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                  'Content-Type': 'multipart/form-data'
                                }
                              });
                              const imageUrl = `${process.env.REACT_APP_BACKEND_URL}${response.data.url}`;
                              const newMediaUrls = [...(scene.media_urls || []), imageUrl];
                              updateScene(sceneIndex, 'media_urls', newMediaUrls);
                              toast.success('Image uploaded');
                            } catch (error) {
                              toast.error('Failed to upload image');
                            }
                          };
                          input.click();
                        }}
                        variant="ghost"
                        className="text-zinc-400 hover:text-white text-xs h-6"
                        data-testid={`add-scene-media-${sceneIndex}`}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add Photo
                      </Button>
                    </div>
                    
                    {scene.media_urls && scene.media_urls.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {scene.media_urls.map((url, mediaIndex) => (
                          <div key={mediaIndex} className="relative w-24 h-24 group">
                            <img 
                              src={url} 
                              alt={`Scene media ${mediaIndex + 1}`}
                              className="w-full h-full object-cover border border-zinc-700"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newMediaUrls = scene.media_urls.filter((_, i) => i !== mediaIndex);
                                updateScene(sceneIndex, 'media_urls', newMediaUrls);
                              }}
                              className="absolute top-1 right-1 bg-red-900/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              data-testid={`remove-scene-media-${sceneIndex}-${mediaIndex}`}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Choices */}
                  <div className="space-y-3 pt-4 border-t border-zinc-800">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-zinc-500">CHOICES (Enhanced with procedural tracking)</span>
                      <Button
                        onClick={() => addChoice(sceneIndex)}
                        variant="ghost"
                        className="text-zinc-400 hover:text-white text-xs h-6"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                    </div>

                    {scene.choices.map((choice, choiceIndex) => (
                      <div key={choice.id} className="p-4 bg-zinc-950 border border-zinc-800 space-y-3">
                        <div className="flex items-center gap-2">
                          <Input
                            value={choice.text}
                            onChange={(e) => updateChoice(sceneIndex, choiceIndex, 'text', e.target.value)}
                            placeholder="Choice text..."
                            className="bg-zinc-900 border-zinc-800 rounded-none text-white flex-1 h-8 text-sm"
                          />
                          <Button
                            variant="ghost"
                            onClick={() => removeChoice(sceneIndex, choiceIndex)}
                            className="text-zinc-400 hover:text-red-500 h-8 w-8 p-0"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        {/* Basic choice params */}
                        <div className="grid grid-cols-4 gap-2">
                          <div>
                            <Label className="text-zinc-600 text-xs">Score Delta</Label>
                            <Input
                              type="number"
                              value={choice.score_delta}
                              onChange={(e) => updateChoice(sceneIndex, choiceIndex, 'score_delta', parseInt(e.target.value))}
                              className="bg-zinc-900 border-zinc-800 rounded-none text-white h-8 text-xs"
                            />
                          </div>
                          <div>
                            <Label className="text-zinc-600 text-xs">Next Scene</Label>
                            <Input
                              value={choice.next_scene_id}
                              onChange={(e) => updateChoice(sceneIndex, choiceIndex, 'next_scene_id', e.target.value)}
                              placeholder="S1"
                              className="bg-zinc-900 border-zinc-800 rounded-none text-white h-8 text-xs"
                            />
                          </div>
                          <div>
                            <Label className="text-zinc-600 text-xs">Risk Flag</Label>
                            <Select 
                              value={choice.risk_flag} 
                              onValueChange={(v) => updateChoice(sceneIndex, choiceIndex, 'risk_flag', v)}
                            >
                              <SelectTrigger className="bg-zinc-900 border-zinc-800 rounded-none text-white h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-zinc-900 border-zinc-800">
                                {RISK_FLAGS.map(flag => (
                                  <SelectItem key={flag} value={flag} className="capitalize">{flag}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-zinc-600 text-xs">Legal Req.</Label>
                            <Select 
                              value={choice.legal_requirement || ''} 
                              onValueChange={(v) => updateChoice(sceneIndex, choiceIndex, 'legal_requirement', v || null)}
                            >
                              <SelectTrigger className="bg-zinc-900 border-zinc-800 rounded-none text-white h-8 text-xs">
                                <SelectValue placeholder="None" />
                              </SelectTrigger>
                              <SelectContent className="bg-zinc-900 border-zinc-800">
                                {LEGAL_REQUIREMENTS.map(req => (
                                  <SelectItem key={req.value} value={req.value}>{req.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Enhanced tracking params */}
                        <div className="grid grid-cols-4 gap-2">
                          <div>
                            <Label className="text-blue-400 text-xs">Conviction +/-</Label>
                            <Input
                              type="number"
                              value={choice.conviction_delta || 0}
                              onChange={(e) => updateChoice(sceneIndex, choiceIndex, 'conviction_delta', parseInt(e.target.value))}
                              className="bg-zinc-900 border-zinc-800 rounded-none text-white h-8 text-xs"
                            />
                          </div>
                          <div>
                            <Label className="text-blue-400 text-xs">Evidence +/-</Label>
                            <Input
                              type="number"
                              value={choice.evidence_strength_delta || 0}
                              onChange={(e) => updateChoice(sceneIndex, choiceIndex, 'evidence_strength_delta', parseInt(e.target.value))}
                              className="bg-zinc-900 border-zinc-800 rounded-none text-white h-8 text-xs"
                            />
                          </div>
                          <div className="col-span-2">
                            <Label className="text-red-400 text-xs">Procedural Violation</Label>
                            <Select 
                              value={choice.procedural_violation || ''} 
                              onValueChange={(v) => updateChoice(sceneIndex, choiceIndex, 'procedural_violation', v || null)}
                            >
                              <SelectTrigger className="bg-zinc-900 border-zinc-800 rounded-none text-white h-8 text-xs">
                                <SelectValue placeholder="None" />
                              </SelectTrigger>
                              <SelectContent className="bg-zinc-900 border-zinc-800">
                                <SelectItem value="">None</SelectItem>
                                {PROCEDURAL_VIOLATIONS.map(v => (
                                  <SelectItem key={v.value} value={v.value}>{v.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* Evidence/Clues Tab */}
            <TabsContent value="clues" className="mt-0 space-y-4">
              <div className="flex items-center justify-between">
                <Button
                  onClick={addClue}
                  className="bg-zinc-800 text-white hover:bg-zinc-700 rounded-none uppercase tracking-widest text-xs"
                  data-testid="add-clue-btn"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Evidence
                </Button>
                <p className="text-zinc-500 text-xs font-mono">Enhanced evidence system with legal tracking</p>
              </div>

              {caseData.clues.map((clue, index) => (
                <div key={clue.id} className="p-4 border border-zinc-800 bg-zinc-900/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-zinc-500">ID: {clue.id.slice(0, 8)}</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={clue.load_bearing}
                          onCheckedChange={(v) => updateClue(index, 'load_bearing', v)}
                        />
                        <Label className="text-xs text-amber-500">Key Evidence</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={clue.misdirection}
                          onCheckedChange={(v) => updateClue(index, 'misdirection', v)}
                        />
                        <Label className="text-xs text-zinc-400">Misdirection</Label>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => removeClue(index)}
                        className="text-zinc-400 hover:text-red-500 h-8 w-8 p-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <ImageUpload
                      value={clue.image_url}
                      onChange={(url) => updateClue(index, 'image_url', url)}
                      token={token}
                      label="Evidence Photo"
                      previewSize="small"
                    />
                    
                    <div className="flex-1 space-y-3">
                      <Input
                        value={clue.label}
                        onChange={(e) => updateClue(index, 'label', e.target.value)}
                        placeholder="Evidence Label"
                        className="bg-zinc-950 border-zinc-800 rounded-none text-white"
                      />
                      <Textarea
                        value={clue.description}
                        onChange={(e) => updateClue(index, 'description', e.target.value)}
                        placeholder="What the evidence reveals..."
                        className="bg-zinc-950 border-zinc-800 rounded-none text-white h-16"
                      />
                    </div>
                  </div>

                  {/* Evidence System Fields */}
                  <div className="pt-4 border-t border-zinc-800">
                    <h4 className="font-mono text-xs text-blue-400 mb-3 flex items-center gap-2">
                      <Gavel className="w-3 h-3" />
                      LEGAL EVIDENCE PARAMETERS
                    </h4>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label className="text-zinc-500 text-xs">Category</Label>
                        <Select 
                          value={clue.evidence_category || 'physical'} 
                          onValueChange={(v) => updateClue(index, 'evidence_category', v)}
                        >
                          <SelectTrigger className="bg-zinc-950 border-zinc-800 rounded-none text-white h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border-zinc-800">
                            {EVIDENCE_CATEGORIES.map(cat => (
                              <SelectItem key={cat} value={cat} className="capitalize">{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-zinc-500 text-xs">Type</Label>
                        <Select 
                          value={clue.evidence_type || 'generic'} 
                          onValueChange={(v) => updateClue(index, 'evidence_type', v)}
                        >
                          <SelectTrigger className="bg-zinc-950 border-zinc-800 rounded-none text-white h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border-zinc-800">
                            {EVIDENCE_TYPES.map(type => (
                              <SelectItem key={type} value={type} className="uppercase">{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-zinc-500 text-xs">Strength (1-25)</Label>
                        <Input
                          type="number"
                          min={1}
                          max={25}
                          value={clue.evidence_strength || 10}
                          onChange={(e) => updateClue(index, 'evidence_strength', parseInt(e.target.value))}
                          className="bg-zinc-950 border-zinc-800 rounded-none text-white h-8 text-xs"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={clue.chain_of_custody !== false}
                          onCheckedChange={(v) => updateClue(index, 'chain_of_custody', v)}
                        />
                        <Label className="text-xs text-emerald-400">Chain of Custody</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={clue.legally_obtained !== false}
                          onCheckedChange={(v) => updateClue(index, 'legally_obtained', v)}
                        />
                        <Label className="text-xs text-emerald-400">Legally Obtained</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={clue.requires_warrant}
                          onCheckedChange={(v) => updateClue(index, 'requires_warrant', v)}
                        />
                        <Label className="text-xs text-amber-400">Requires Warrant</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={clue.requires_consent}
                          onCheckedChange={(v) => updateClue(index, 'requires_consent', v)}
                        />
                        <Label className="text-xs text-amber-400">Requires Consent</Label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* Endings Tab */}
            <TabsContent value="endings" className="mt-0 space-y-4">
              <p className="text-zinc-500 text-xs font-mono mb-4">Configure all possible case outcomes with conviction requirements</p>
              
              {caseData.endings.map((ending, index) => {
                const endingType = ENDING_TYPES.find(t => t.value === ending.type) || ENDING_TYPES[0];
                const borderColor = {
                  'CLOSED': 'border-emerald-800',
                  'DISMISSED': 'border-amber-800',
                  'COMPROMISED': 'border-red-800',
                  'ESCALATED': 'border-blue-800'
                }[ending.type] || 'border-zinc-800';
                const textColor = {
                  'CLOSED': 'text-emerald-500',
                  'DISMISSED': 'text-amber-500',
                  'COMPROMISED': 'text-red-500',
                  'ESCALATED': 'text-blue-500'
                }[ending.type] || 'text-zinc-500';

                return (
                  <div 
                    key={ending.id} 
                    className={`p-6 border bg-zinc-900/30 space-y-4 ${borderColor}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Select 
                          value={ending.type} 
                          onValueChange={(v) => updateEnding(index, 'type', v)}
                        >
                          <SelectTrigger className={`bg-zinc-950 border-zinc-800 rounded-none w-48 ${textColor}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border-zinc-800">
                            {ENDING_TYPES.map(type => (
                              <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-4">
                        <Label className="text-xs text-zinc-400">Base XP:</Label>
                        <Input
                          type="number"
                          value={ending.cp_base}
                          onChange={(e) => updateEnding(index, 'cp_base', parseInt(e.target.value))}
                          className="bg-zinc-950 border-zinc-800 rounded-none text-white w-24 h-8"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-6">
                      <ImageUpload
                        value={ending.mugshot_url}
                        onChange={(url) => updateEnding(index, 'mugshot_url', url)}
                        token={token}
                        label={ending.type === 'CLOSED' ? "Perp Mugshot" : "Case File Photo"}
                        previewSize="medium"
                      />
                      
                      <div className="flex-1 space-y-4">
                        <Input
                          value={ending.title}
                          onChange={(e) => updateEnding(index, 'title', e.target.value)}
                          placeholder="Ending Title"
                          className="bg-zinc-950 border-zinc-800 rounded-none text-white"
                        />
                        <Textarea
                          value={ending.narration}
                          onChange={(e) => updateEnding(index, 'narration', e.target.value)}
                          placeholder="Ending narration (what happens when the case concludes)..."
                          className="bg-zinc-950 border-zinc-800 rounded-none text-white h-24 font-typewriter"
                        />
                      </div>
                    </div>

                    {/* Ending Requirements */}
                    <div className="pt-4 border-t border-zinc-800">
                      <h4 className="font-mono text-xs text-zinc-400 mb-3 flex items-center gap-2">
                        <Scale className="w-3 h-3" />
                        ENDING REQUIREMENTS
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-zinc-500 text-xs">Min Conviction %</Label>
                          <Input
                            type="number"
                            min={0}
                            max={100}
                            value={ending.min_conviction_probability || 0}
                            onChange={(e) => updateEnding(index, 'min_conviction_probability', parseInt(e.target.value))}
                            className="bg-zinc-950 border-zinc-800 rounded-none text-white h-8 text-xs"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-zinc-500 text-xs">Max Procedural Risk</Label>
                          <Select 
                            value={ending.max_procedural_risk || 'critical'} 
                            onValueChange={(v) => updateEnding(index, 'max_procedural_risk', v)}
                          >
                            <SelectTrigger className="bg-zinc-950 border-zinc-800 rounded-none text-white h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800">
                              {MAX_PROCEDURAL_RISK.map(risk => (
                                <SelectItem key={risk} value={risk} className="uppercase">{risk}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-zinc-500 text-xs">Required Evidence</Label>
                          <Input
                            type="number"
                            min={0}
                            max={20}
                            value={ending.required_evidence_count || 0}
                            onChange={(e) => updateEnding(index, 'required_evidence_count', parseInt(e.target.value))}
                            className="bg-zinc-950 border-zinc-800 rounded-none text-white h-8 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
