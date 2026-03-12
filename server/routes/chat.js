import { Router } from 'express'

const router = Router()

function pickLang(language) {
  if (language === 'hi' || language === 'ta' || language === 'ml') return language
  return 'en'
}

function greet(lang) {
  if (lang === 'hi') return 'नमस्ते दीदी, '
  if (lang === 'ta') return 'வணக்கம் அக்கா, '
  if (lang === 'ml') return 'നമസ്കാരം ചേച്ചി, '
  return 'Hello sister, '
}

function includesAny(s, arr) {
  return arr.some((k) => s.includes(k))
}

router.post('/', (req, res) => {
  const { text, language } = req.body || {}
  if (!text) return res.status(400).json({ error: 'text is required' })

  const lang = pickLang(language)
  const q = String(text).toLowerCase()

  // Recommended sample questions:
  // 1) Suitable job  2) Maternity leave  3) Business loan  4) Unsafe at work rights
  const isJob = includesAny(q, ['job', 'jobs', 'suitable', 'suit', 'career', 'kaabil', 'काम', 'नौकरी', 'வேலை', 'ജോലി'])
  const isMaternity = includesAny(q, ['maternity', 'leave', 'मेटरनिटी', 'प्रसूति', 'மட்டேர்னிட்டி', 'மகப்பேறு', 'പ്രസവ', 'മാറ്റേണിറ്റി'])
  const isLoan = includesAny(q, ['loan', 'mudra', 'mfi', 'bank', 'stand up', 'लोन', 'ऋण', 'मुद्रा', 'முத்ரா', 'கடன்', 'ലോൺ', 'മുദ്ര'])
  const isRights = includesAny(q, ['unsafe', 'harass', 'rights', 'posh', 'complaint', 'सुरक्षित', 'उत्पीड़न', 'अधिकार', 'பாதுகாப்ப', 'துன்புறுத்த', 'உரிமை', 'അസുരക്ഷ', 'പീഡനം', 'അവകാശ'])

  let bodyEn = ''
  let bodyHi = ''
  let bodyTa = ''
  let bodyMl = ''

  if (isMaternity) {
    bodyEn =
      'Maternity leave in India (Maternity Benefit Act) is commonly up to 26 weeks for eligible employees. Ask your HR about eligibility, notice, and documents. If your workplace denies it, request the policy in writing.'
    bodyHi =
      'भारत में (Maternity Benefit Act) के तहत पात्र कर्मचारियों के लिए मातृत्व अवकाश अक्सर 26 हफ्ते तक होता है। अपनी HR से पात्रता, नोटिस और दस्तावेज़ पूछें। अगर मना करें तो पॉलिसी लिखित में माँगें।'
    bodyTa =
      'இந்தியாவில் (Maternity Benefit Act) பொருந்தும் பணியாளர்களுக்கு பொதுவாக 26 வாரங்கள் வரை மகப்பேறு விடுப்பு வழங்கப்படுகிறது. HR‑இடம் தகுதி/முன்அறிவிப்பு/ஆவணங்கள் கேளுங்கள். மறுத்தால் policy‑ஐ எழுத்துப்பூர்வமாக கேளுங்கள்.'
    bodyMl =
      'ഇന്ത്യയിൽ (Maternity Benefit Act) പ്രകാരം അർഹമായ ജീവനക്കാരികൾക്ക് സാധാരണയായി 26 ആഴ്ച വരെ പ്രസവാവധി ലഭിക്കും. HR‑നോട് അർഹത/നോട്ടീസ്/ഡോക്യുമെന്റുകൾ ചോദിക്കുക. നിഷേധിച്ചാൽ നയം എഴുത്തിൽ ചോദിക്കുക.'
  } else if (isLoan) {
    bodyEn =
      'For business loans, start with MUDRA (Shishu/Kishore/Tarun). Prepare Aadhaar, PAN, bank statements, and a simple business plan. Tell me your business + amount and I’ll suggest the best scheme path.'
    bodyHi =
      'बिज़नेस लोन के लिए MUDRA (Shishu/Kishore/Tarun) से शुरू करें। आधार, PAN, बैंक स्टेटमेंट और छोटा बिज़नेस प्लान तैयार रखें। अपना बिज़नेस + रकम बताइए—मैं सही स्कीम सुझा दूँगी।'
    bodyTa =
      'வியாபார கடனுக்கு MUDRA (Shishu/Kishore/Tarun) மூலம் தொடங்குங்கள். ஆதார், PAN, வங்கி விவரம், எளிய வியாபார திட்டம் தயாராக வைத்துக்கொள்ளுங்கள். உங்கள் வியாபாரம் + தொகை சொன்னால் சரியான திட்ட பாதையை சொல்கிறேன்.'
    bodyMl =
      'ബിസിനസ് ലോൺ വേണ്ടി MUDRA (Shishu/Kishore/Tarun) വഴി തുടങ്ങുക. ആധാർ, PAN, ബാങ്ക് സ്റ്റേറ്റ്മെന്റുകൾ, ലളിതമായ ബിസിനസ് പ്ലാൻ തയ്യാറാക്കുക. നിങ്ങളുടെ ബിസിനസ് + തുക പറഞ്ഞാൽ ശരിയായ സ്കീം പാത്ത് നിർദ്ദേശിക്കാം.'
  } else if (isRights) {
    bodyEn =
      'If you feel unsafe/harassed at work: move to safety, document date/time/witnesses, report to the Internal Complaints Committee (POSH), and ask for written acknowledgement. I can help draft an HR complaint.'
    bodyHi =
      'अगर आप असुरक्षित महसूस कर रही हैं/उत्पीड़न है: सुरक्षित जगह जाएँ, तारीख/समय/गवाह लिखें, Internal Complaints Committee (POSH) को रिपोर्ट करें, और लिखित acknowledgement माँगें। मैं HR शिकायत का ड्राफ्ट बना सकती हूँ।'
    bodyTa =
      'வேலை இடத்தில் பாதுகாப்பாக இல்லை / தொந்தரவு நடந்தால்: பாதுகாப்பான இடத்திற்கு செல்லுங்கள், தேதி/நேரம்/சாட்சி பதிவு செய்யுங்கள், POSH (Internal Complaints Committee)‑க்கு புகார் அளியுங்கள், எழுத்துப்பூர்வ acknowledgement கேளுங்கள். HR புகார் draft உதவுவேன்.'
    bodyMl =
      'ജോലിസ്ഥലത്ത് അസുരക്ഷിതമോ പീഡനമോ ഉണ്ടെങ്കിൽ: സുരക്ഷിത സ്ഥലത്തേക്ക് മാറുക, തീയതി/സമയം/സാക്ഷികൾ രേഖപ്പെടുത്തുക, POSH (Internal Complaints Committee)‑നെ അറിയിക്കുക, എഴുത്തിൽ acknowledgement ചോദിക്കുക. HR പരാതിയുടെ ഡ്രാഫ്റ്റ് ഒരുക്കാം.'
  } else if (isJob) {
    bodyEn =
      'To suggest a suitable job, tell me your city, education, and last field. Meanwhile: open SafeCareer for nearby jobs and SkillBridge for WhatsApp/SMS learning. You can also browse Kaabil listings.'
    bodyHi =
      'आपके लिए सही नौकरी सुझाने के लिए शहर, शिक्षा और पिछला फील्ड बताइए। अभी: पास की नौकरियों के लिए SafeCareer, WhatsApp/SMS सीखने के लिए SkillBridge। Kaabil jobs भी देख सकती हैं।'
    bodyTa =
      'உங்களுக்கு ஏற்ற வேலை பரிந்துரைக்க உங்கள் நகரம், கல்வி, கடைசி துறை சொல்லுங்கள். இப்போது: அருகிலுள்ள வேலைகளுக்கு SafeCareer, WhatsApp/SMS பாடங்களுக்கு SkillBridge. Kaabil jobs‑யும் பார்க்கலாம்.'
    bodyMl =
      'നിങ്ങൾക്ക് അനുയോജ്യമായ ജോലി നിർദ്ദേശിക്കാൻ നഗരം, വിദ്യാഭ്യാസം, അവസാന ഫീൽഡ് പറയൂ. ഇപ്പോൾ: സമീപ ജോലികൾക്കായി SafeCareer, WhatsApp/SMS പഠനത്തിന് SkillBridge. Kaabil jobs‑യും കാണാം.'
  } else {
    bodyEn =
      'I can help with jobs, maternity leave, loans (MUDRA), and workplace safety rights. Ask one question and tell me your city.'
    bodyHi =
      'मैं नौकरी, मातृत्व अवकाश, लोन (MUDRA) और कार्यस्थल सुरक्षा अधिकारों में मदद कर सकती हूँ। एक सवाल पूछिए और अपना शहर बताइए।'
    bodyTa =
      'வேலை, மகப்பேறு விடுப்பு, கடன் (MUDRA), வேலை இட பாதுகாப்பு உரிமைகள்—உதவுவேன். ஒரு கேள்வி கேளுங்கள்; உங்கள் நகரம் சொல்லுங்கள்.'
    bodyMl =
      'ജോലി, പ്രസവാവധി, ലോൺ (MUDRA), ജോലി സ്ഥല സുരക്ഷാവകാശങ്ങൾ—സഹായിക്കും. ഒരു ചോദ്യം ചോദിക്കുക; നിങ്ങളുടെ നഗരം പറയൂ.'
  }

  const prefix = greet(lang)
  const answer = lang === 'hi' ? bodyHi : lang === 'ta' ? bodyTa : lang === 'ml' ? bodyMl : bodyEn
  res.json({ reply: prefix + answer })
})

export { router as chatRouter }

