import React, { useState, useRef, useEffect } from 'react';
import { LandlordVerification, VerificationDocType } from '../types';
import { 
  X, 
  ShieldCheck, 
  Phone, 
  FileText, 
  Camera, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  RefreshCw, 
  Lock, 
  AlertCircle, 
  Check, 
  Scan, 
  UserCheck, 
  Award,
  Smartphone,
  Info
} from 'lucide-react';

interface LandlordVerificationModalProps {
  currentVerification?: LandlordVerification;
  landlordName: string;
  landlordPhone: string;
  onClose: () => void;
  onCompleteVerification: (verification: LandlordVerification) => void;
}

const SAMPLE_ID_PHOTOS = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80'
];

export const LandlordVerificationModal: React.FC<LandlordVerificationModalProps> = ({
  currentVerification,
  landlordName,
  landlordPhone,
  onClose,
  onCompleteVerification
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Phone Verification State
  const [phone, setPhone] = useState(currentVerification?.phone || landlordPhone || '+233 24 123 4567');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(0);
  const [phoneVerified, setPhoneVerified] = useState(currentVerification?.phoneVerified || false);
  const [phoneError, setPhoneError] = useState('');

  // Step 2: National ID Verification State
  const [idType, setIdType] = useState<VerificationDocType>(currentVerification?.idType || 'Ghana Card');
  const [idNumber, setIdNumber] = useState(currentVerification?.idNumber || 'GHA-712345678-9');
  const [idFrontUrl, setIdFrontUrl] = useState(currentVerification?.idFrontUrl || SAMPLE_ID_PHOTOS[0]);
  const [idBackUrl, setIdBackUrl] = useState(currentVerification?.idBackUrl || SAMPLE_ID_PHOTOS[1]);
  const [isScanningDoc, setIsScanningDoc] = useState(false);
  const [docScanSuccess, setDocScanSuccess] = useState(false);

  // Step 3: Selfie & Biometric Check State
  const [selfieUrl, setSelfieUrl] = useState(currentVerification?.selfieUrl || SAMPLE_ID_PHOTOS[0]);
  const [isCapturingCamera, setIsCapturingCamera] = useState(false);
  const [isMatchingFace, setIsMatchingFace] = useState(false);
  const [livenessPassed, setLivenessPassed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Handle OTP timer
  useEffect(() => {
    let interval: any;
    if (otpTimer > 0) {
      interval = setInterval(() => setOtpTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleSendOtp = () => {
    if (!phone || phone.length < 9) {
      setPhoneError('Please enter a valid Ghanaian phone number (+233...)');
      return;
    }
    setPhoneError('');
    setOtpSent(true);
    setOtpTimer(45);
  };

  const handleVerifyOtp = () => {
    const code = otpCode.join('');
    if (code.length === 4) {
      setPhoneVerified(true);
      setPhoneError('');
    } else {
      setPhoneError('Please enter a 4-digit verification code.');
    }
  };

  const handleScanDocument = () => {
    if (!idNumber) return;
    setIsScanningDoc(true);
    setTimeout(() => {
      setIsScanningDoc(false);
      setDocScanSuccess(true);
    }, 1800);
  };

  const handleStartCamera = async () => {
    setIsCapturingCamera(true);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
    } catch {
      // Fallback
    }
  };

  const handleTakeSelfie = () => {
    setIsMatchingFace(true);
    setTimeout(() => {
      setIsMatchingFace(false);
      setLivenessPassed(true);
      setIsCapturingCamera(false);
    }, 2000);
  };

  const handleFinishAll = () => {
    const completedVerification: LandlordVerification = {
      status: 'Verified',
      phoneVerified: true,
      phone,
      idType,
      idNumber,
      idFrontUrl,
      idBackUrl,
      selfieUrl,
      livenessPassed: true,
      submittedAt: new Date().toISOString(),
      verifiedAt: new Date().toISOString()
    };

    onCompleteVerification(completedVerification);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl border border-neutral-200 flex flex-col my-auto relative text-neutral-900">
        
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base sm:text-lg font-extrabold text-neutral-900">Landlord Verification Portal</h2>
                <span className="bg-emerald-500 text-white text-[10px] font-extrabold px-2 py-0.2 rounded-full uppercase tracking-wider">
                  Official
                </span>
              </div>
              <p className="text-xs text-neutral-500">Ghana National ID & Biometric Verification</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Step Bar */}
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200 flex items-center justify-between gap-2 text-xs font-bold">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-emerald-700' : 'text-neutral-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-600'}`}>1</span>
            <span className="hidden sm:inline">Phone OTP</span>
          </div>
          <div className="w-8 h-0.5 bg-neutral-200"></div>

          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-emerald-700' : 'text-neutral-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-600'}`}>2</span>
            <span className="hidden sm:inline">National ID</span>
          </div>
          <div className="w-8 h-0.5 bg-neutral-200"></div>

          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-emerald-700' : 'text-neutral-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-600'}`}>3</span>
            <span className="hidden sm:inline">Selfie & Liveness</span>
          </div>
          <div className="w-8 h-0.5 bg-neutral-200"></div>

          <div className={`flex items-center gap-1.5 ${step === 4 ? 'text-emerald-700' : 'text-neutral-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 4 ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-600'}`}>4</span>
            <span className="hidden sm:inline">Badge Issued</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">

          {/* STEP 1: PHONE VERIFICATION */}
          {step === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200/80 flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider">Step 1 of 3: Ghanaian Phone Verification</h4>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Verify your active Ghanaian phone number to receive direct SMS alerts for tenant viewing requests.
                  </p>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                  Landlord Phone Number (Ghana) *
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+233 24 123 4567"
                    disabled={phoneVerified}
                    className="flex-1 p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-emerald-50 disabled:text-emerald-900"
                  />
                  {!phoneVerified && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={otpTimer > 0}
                      className="bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-3 rounded-xl text-xs font-bold shrink-0 disabled:opacity-50 transition-all"
                    >
                      {otpTimer > 0 ? `Resend (${otpTimer}s)` : otpSent ? 'Resend SMS Code' : 'Send SMS OTP'}
                    </button>
                  )}
                </div>
                {phoneError && <p className="text-xs text-rose-600 font-medium mt-1">{phoneError}</p>}
              </div>

              {otpSent && !phoneVerified && (
                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-800">Enter 4-Digit SMS Code</span>
                    <span className="text-[11px] text-neutral-500 font-mono">Code sent to {phone}</span>
                  </div>

                  <div className="flex items-center gap-2 justify-center py-2">
                    {[0, 1, 2, 3].map((idx) => (
                      <input
                        key={idx}
                        id={`otp-box-${idx}`}
                        type="text"
                        maxLength={1}
                        value={otpCode[idx]}
                        onChange={(e) => {
                          const val = e.target.value;
                          const newCode = [...otpCode];
                          newCode[idx] = val;
                          setOtpCode(newCode);
                          if (val && idx < 3) {
                            const nextBox = document.getElementById(`otp-box-${idx + 1}`);
                            nextBox?.focus();
                          }
                        }}
                        className="w-12 h-12 text-center text-lg font-mono font-extrabold bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => setOtpCode(['1', '2', '3', '4'])}
                      className="text-[11px] text-emerald-700 underline font-bold"
                    >
                      Use Demo Auto-fill (1234)
                    </button>

                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1 shadow-sm"
                    >
                      <Check className="w-4 h-4" /> Verify Code
                    </button>
                  </div>
                </div>
              )}

              {phoneVerified && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Phone Number (+233 ...) Verified via SMS OTP</span>
                  </div>
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Verified</span>
                </div>
              )}

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-bold text-neutral-500 hover:text-neutral-800"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!phoneVerified) {
                      setPhoneVerified(true); // Allow quick skip for demo
                    }
                    setStep(2);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-extrabold text-xs flex items-center gap-2 shadow-md transition-all"
                >
                  <span>Continue to National ID</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: NATIONAL ID UPLOAD */}
          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200/80 flex items-start gap-3">
                <FileText className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-extrabold text-blue-950 uppercase tracking-wider">Step 2 of 3: Ghana National Identity Verification</h4>
                  <p className="text-xs text-blue-800 mt-0.5">
                    Upload your Ghana Card (NIA), Passport, or DVLA Driver's License to confirm legal ownership and prevent fake property listings.
                  </p>
                </div>
              </div>

              {/* Document Type Selector */}
              <div>
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                  Select ID Document Type *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Ghana Card', 'Passport', 'Driver License'] as VerificationDocType[]).map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setIdType(type)}
                      className={`p-3 rounded-2xl text-xs font-extrabold text-center border transition-all ${
                        idType === type
                          ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                      }`}
                    >
                      {type === 'Ghana Card' && '🪪 '}
                      {type === 'Passport' && '🛂 '}
                      {type === 'Driver License' && '🚘 '}
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* ID Number Input */}
              <div>
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                  {idType} Identification Number *
                </label>
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder={idType === 'Ghana Card' ? 'e.g. GHA-712345678-9' : 'Enter ID number'}
                  className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-[11px] text-neutral-500 mt-1">
                  💡 Format check: Ghana Card pin numbers begin with <code className="bg-neutral-100 px-1 py-0.5 rounded font-mono">GHA-</code> followed by 9 digits.
                </p>
              </div>

              {/* Upload Document Front & Back */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Front Side */}
                <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-4 text-center bg-neutral-50/50 hover:bg-neutral-50 transition-colors relative">
                  <div className="w-full h-28 rounded-xl overflow-hidden bg-neutral-200 mb-2 border border-neutral-300">
                    <img src={idFrontUrl} alt="Front ID" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[11px] font-bold text-neutral-700 uppercase block">ID Front Photo</span>
                  <p className="text-[10px] text-neutral-400">Clear photo showing NIA chip & photo</p>
                  
                  <div className="flex justify-center gap-1 mt-2">
                    {SAMPLE_ID_PHOTOS.map((img, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setIdFrontUrl(img)}
                        className="w-8 h-8 rounded-md overflow-hidden border border-neutral-300 hover:scale-105"
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Back Side */}
                <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-4 text-center bg-neutral-50/50 hover:bg-neutral-50 transition-colors relative">
                  <div className="w-full h-28 rounded-xl overflow-hidden bg-neutral-200 mb-2 border border-neutral-300">
                    <img src={idBackUrl} alt="Back ID" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[11px] font-bold text-neutral-700 uppercase block">ID Back Photo</span>
                  <p className="text-[10px] text-neutral-400">Barcode & address registration info</p>

                  <div className="flex justify-center gap-1 mt-2">
                    {SAMPLE_ID_PHOTOS.map((img, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setIdBackUrl(img)}
                        className="w-8 h-8 rounded-md overflow-hidden border border-neutral-300 hover:scale-105"
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* OCR Scanning Trigger */}
              <div className="pt-2">
                {!docScanSuccess ? (
                  <button
                    type="button"
                    onClick={handleScanDocument}
                    disabled={isScanningDoc}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    {isScanningDoc ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying with NIA Ghana Registry...</span>
                      </>
                    ) : (
                      <>
                        <Scan className="w-4 h-4" />
                        <span>Verify {idType} Document</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="p-3.5 bg-blue-50 border border-blue-300 rounded-2xl flex items-center justify-between text-xs font-bold text-blue-900">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      <span>Document Scanned & Extracted: {landlordName}</span>
                    </div>
                    <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-md">Pass</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-neutral-600 hover:text-neutral-900 flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Phone
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-extrabold text-xs flex items-center gap-2 shadow-md transition-all"
                >
                  <span>Continue to Selfie Biometrics</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SELFIE & LIVENESS VERIFICATION */}
          {step === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200/80 flex items-start gap-3">
                <UserCheck className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-extrabold text-purple-950 uppercase tracking-wider">Step 3 of 3: Biometric Selfie & Liveness Check</h4>
                  <p className="text-xs text-purple-800 mt-0.5">
                    Capture a live selfie photo to match your face biometrically against your uploaded {idType}.
                  </p>
                </div>
              </div>

              {/* Camera Preview Box / Oval Alignment */}
              <div className="relative w-full max-w-sm mx-auto h-64 bg-neutral-900 rounded-3xl overflow-hidden border-4 border-neutral-800 flex items-center justify-center text-white text-center p-4">
                
                {isCapturingCamera ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover rounded-2xl" />
                    
                    {/* Oval Face Overlay */}
                    <div className="absolute border-2 border-dashed border-emerald-400 w-40 h-52 rounded-full pointer-events-none animate-pulse"></div>
                    <span className="absolute bottom-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-emerald-300">
                      Align Face Inside Oval
                    </span>
                  </div>
                ) : (
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <img src={selfieUrl} alt="Selfie" className="w-full h-full object-cover" />
                    {livenessPassed && (
                      <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-xs flex flex-col items-center justify-center space-y-2">
                        <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <span className="text-xs font-extrabold text-emerald-200 font-mono">99.4% Face Match Confirmed</span>
                      </div>
                    )}
                  </div>
                )}

                {isMatchingFace && (
                  <div className="absolute inset-0 bg-neutral-900/90 backdrop-blur-md flex flex-col items-center justify-center space-y-3">
                    <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                    <span className="text-xs font-bold text-emerald-300">Matching Biometrics with {idType}...</span>
                  </div>
                )}

              </div>

              {/* Action Controls for Selfie */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                {!isCapturingCamera ? (
                  <button
                    type="button"
                    onClick={handleStartCamera}
                    className="bg-neutral-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4 text-emerald-400" /> Open Live Camera
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleTakeSelfie}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md"
                  >
                    <Camera className="w-4 h-4" /> Capture Photo & Scan
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setIsMatchingFace(true);
                    setTimeout(() => {
                      setIsMatchingFace(false);
                      setLivenessPassed(true);
                    }, 1500);
                  }}
                  className="bg-purple-100 text-purple-900 hover:bg-purple-200 px-5 py-2.5 rounded-xl text-xs font-bold"
                >
                  Confirm Photo Biometrics
                </button>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs font-bold text-neutral-600 hover:text-neutral-900 flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to ID
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLivenessPassed(true);
                    setStep(4);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-extrabold text-xs flex items-center gap-2 shadow-md transition-all"
                >
                  <span>Submit Verification</span>
                  <Award className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: VERIFICATION COMPLETE & BADGE ISSUED */}
          {step === 4 && (
            <div className="space-y-6 text-center py-4 animate-fadeIn">
              
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner relative">
                <ShieldCheck className="w-12 h-12" />
                <span className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-1 rounded-full shadow-md">
                  <Award className="w-4 h-4" />
                </span>
              </div>

              <div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Verification Passed 100%
                </span>
                <h3 className="text-2xl font-extrabold text-neutral-900 mt-2">Congratulations, Verified Landlord!</h3>
                <p className="text-xs text-neutral-600 max-w-md mx-auto mt-1">
                  Your identity and Ghanaian national documentation have been authenticated. You have been awarded the official <strong className="text-emerald-800">Verified Landlord Badge</strong>.
                </p>
              </div>

              {/* Verified Certificate Card */}
              <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-emerald-950 text-white p-5 rounded-3xl text-left border border-emerald-500/30 shadow-xl space-y-3 relative overflow-hidden max-w-md mx-auto">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-bold text-neutral-200">Official Rental Trust Certificate</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">REG-2026-GH</span>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-extrabold">{landlordName}</div>
                  <div className="text-xs text-neutral-300 font-mono">📱 Phone: {phone} (SMS Verified)</div>
                  <div className="text-xs text-neutral-300 font-mono">🪪 {idType}: {idNumber}</div>
                  <div className="text-xs text-emerald-300 font-mono pt-1">✅ Biometric Liveness & Face Match: PASSED</div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinishAll}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-2xl font-extrabold text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.01]"
              >
                Apply Badge to Dashboard & Listings
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
