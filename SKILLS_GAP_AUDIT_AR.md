# تدقيق مهارات Zoho Sprints — أين نحن وما الناقص

> **تاريخ التدقيق:** 2026-11-15
> **المرجع:** مهارة `writing-skills` (frontmatter, description, structure, testing, packaging)
> **نطاق:** `F:\zoho sprint skills` فقط — لم يُجرَ أي اتصال أو كتابة على Zoho.

---

## 1. أين نحن الآن

### المهارات الفعّالة (6)

| # | المهارة | الحجم | موجودة في `.agents` | موجودة في `.opencode` | متطابقتان |
|---|---|---|---|---|---|
| 1 | `zoho-workflow` | 5,006 | ✅ | ✅ | ✅ |
| 2 | `zoho-sprints` | 5,350 | ✅ | ✅ | ✅ |
| 3 | `user-story-authoring` | 6,736 | ✅ | ✅ | ✅ |
| 4 | `zoho-project-knowledge` | 3,330 | ✅ | ✅ | ✅ |
| 5 | `zoho-work-item-linking` | 4,572 | ✅ | ✅ | ✅ |
| 6 | `zoho-release-management` | 3,071 | ✅ | ✅ | ✅ |

النسخ في `.agents/skills/` و`.opencode/skills/` **متطابقة بالـ SHA-256** لكل المهارات الست.

### ما أُنجز سابقاً

- طبقة تنسيق `zoho-workflow` أُضيفت (8 نوفمبر) وتُصدر صيغة:
  > **الخطوة التالية الموصى بها:** `<action>` باستخدام `<skill>` — `<reason>`. **الشرط:** `<prerequisite>`.
- دليل استخدام عملي: `SKILLS_USAGE_GUIDE_AR.md`.
- دليل تأسيسي: `SKILLS_GUIDE_AR.md`.
- محاكاة 4 سيناريوهات: `SKILLS_SIMULATION_AR.md`.
- حزمة `zoho-sprints-professional` v2.0.0 (مثبّت + manifest + اختبارات).

### حالة Git — ⚠️

```
آخر Commit: f2bab88  (2026-10-28)  "Add .gitattributes."
الحالة: كل المجلدات التالية Untracked:
  .agents/  .opencode/  zoho-sprints-professional/
  SKILLS_GUIDE_AR.md  SKILLS_USAGE_GUIDE_AR.md  SKILLS_SIMULATION_AR.md
```

**لا يوجد تاريخ إصدارات للمهارات.** أي تعديل مستقبلي لا يمكن مقارنته أو الرجوع عنه.

### الاختبارات

| الاختبار | النتيجة |
|---|---|
| `tests/skill.test.mjs` | ✅ 3/3 |
| `tests/install.test.mjs` | ✅ 9/9 |
| `node --test tests/` (المجلد) | ❌ يفشل على Windows (`MODULE_NOT_FOUND`) — يعمل عند تمرير الملف صراحةً |

كل الاختبارات **بنائية** (manifest/روابط/تثبيت)، ولا يوجد اختبار سلوكي واحد للمهارات الست.

---

## 2. الفجوات — مرتّبة بالأولوية

### 🔴 P0-1 — دعم الوصف الكبير (الخطأ الذي واجهته) مفقود

**الأثر:** عند إرسال وصف طويل عبر `ZohoSprints_UpdateItem` يفشل MCP بـ:
- `414 Request-URI Too Large`
- أو `Error in executing tool`

**السبب الجذري:** ملف الحل موجود **فقط في النسخة الاحتياطية**:

```
.zoho-sprints-skill-backups/1793557989015-e22caa1e/.agents/skills/zoho-sprints/references/large-description-writes.md
```

وليس في:
- `.agents/skills/zoho-sprints/references/`
- `.opencode/skills/zoho-sprints/references/`
- `zoho-sprints-professional/skills/zoho-sprints/references/`

كما أن `SKILL.md` الحالي **لا يذكر** الـ 414 ولا الـ fallback إطلاقاً. النسخة القديمة كانت تحتوي:
> "If MCP fails on a large description with `414` or `Error in executing tool`, use the verified Zoho Sprints API fallback with form-urlencoded data and read back."

الملف المفقود يحتوي الحل الكامل:
- استخدم `POST` مع `application/x-www-form-urlencoded` وليس JSON.
- JSON body قد يعيد `200 success` **دون أن يحفظ** الوصف.
- لا تقسم الوصف ولا تختصره ولا تنقله لحقل آخر.
- بعد الكتابة اقرأ العنصر وتحقق من طول الوصف ووجود الفاصل وبقاء النص الأصلي.

**الإصلاح المقترح:**
1. استعادة `references/large-description-writes.md` إلى المهارة الحية.
2. إضافة بند في `SKILL.md` (قسم Non-negotiable).
3. ربطه من `workflows/document-actual-delivery.md`.
4. إضافة فحص في `checks/write-verification.md`.
5. اختبار ضغط: وصف 8,000+ حرف → يجب أن ينجح عبر الـ fallback.

---

### 🔴 P0-2 — لا توجد مهارة لكتابة المهام (Tasks) للمبرمجين

**الأثر:** المستخدم يطلب "اكتب مهام للمبرمجين" فلا يجد مهارة مخصصة.

**ما هو موجود فعلاً:**

| الموجود | النوع | الحدود |
|---|---|---|
| `zoho-sprints/workflows/developer-child-item.md` | Workflow داخل مهارة (1,353 بايت) | للمطوّر فقط، تحت Story مسندة إليه |
| `zoho-sprints/workflows/admin-management.md` | Workflow إداري (1,467 بايت) | عام، لا قالب Task |
| `user-story-authoring` | مهارة Stories (6,736 بايت) | تقول "A Task must have a parent Story" لكن لا تصوغ Tasks |

**ما هو مفقود:**
- مهارة `zoho-task-authoring` مستقلة.
- قالب Task موحّد (عنوان، وصف، AC، متطلبات اختبار، نقاط، أولوية).
- قواعد الإسناد (من هو المبرمج المسؤول + المدة).
- فحص تكرار خاص بالمهام.
- مسار Admin لإنشاء Task تحت Story موجودة.

**التوصية:** مهارة جديدة `zoho-task-authoring` (وليست توسعة لـ `user-story-authoring`) لأن:
- المحفّز مختلف: "اكتب مهمة" وليس "اكتب قصة".
- المخرَج مختلف: Task لا Story.
- قواعد القبول مختلفة: Task = خطوة تنفيذ تحت Story، وليست قيمة للمستخدم.

---

### 🟠 P1-1 — الحزمة `zoho-sprints-professional` قديمة وأحادية

| البند | الواقع |
|---|---|
| Skills داخل الحزمة | `zoho-sprints` فقط (25 ملفاً) |
| `manifest.json` | يغطي `zoho-sprints` فقط، الإصدار 2.0.0 |
| `install.mjs` | يثبّت `zoho-sprints` فقط |
| نسخة `SKILL.md` في الحزمة | 4,980 بايت / hash `67ed…` |
| نسخة `SKILL.md` الحية | 5,350 بايت / hash `AE06…` |

**الخطر:** تشغيل المثبّت الآن **سيُرجع** `zoho-sprints` إلى نسخة أقدم، ولن يثبّت `zoho-workflow` ولا المهارات الأربع الأخرى.

**الإصلاح:** إصدار v3.0.0 يحتوي المهارات الست + manifest جديد + مثبّت متعدد المهارات + اختبار تثبيت لكل مهارة.

---

### 🟠 P1-2 — لا يوجد تاريخ إصدارات (Git)

كل شيء Untracked. لا يمكن:
- مقارنة نسخة اليوم بنسخة الأمس.
- الرجوع عن خطأ مثل اختفاء `large-description-writes.md`.
- مشاركة الحزمة بشكل موثوق.

**الإصلاح:** Commit أساسي + Tag `v2.0.0` + فرع للإصلاحات.

---

### 🟠 P1-3 — لا اختبارات سلوكية (TDD)

`writing-skills` يشترط:
1. **RED:** سيناريو ضغط بدون المهارة → تسجيل الفشل.
2. **GREEN:** كتابة المهارة → نجاح السيناريو.
3. **REFACTOR:** إغلاق الثغرات.

الحالي: 12 اختباراً بنائياً فقط. لا سيناريو واحد يثبت أن المهارة تُغيّر سلوك الوكيل. ولهذا لم يُكتشف فقدان دعم الوصف الكبير.

---

### 🟡 P2-1 — الأوصاف لا تبدأ بـ "Use when…"

كل المهارات الست أوصافها ملخّصات، لا محفّزات:

| المهارة | بداية الوصف |
|---|---|
| `zoho-workflow` | "Orchestrate a multi-stage…" |
| `zoho-sprints` | "Use connected Zoho Sprints MCP tools…" |
| `user-story-authoring` | (ملخّص) |
| `zoho-project-knowledge` | (ملخّص) |
| `zoho-release-management` | (ملخّص) |
| `zoho-work-item-linking` | (ملخّص) |

**الإصلاح:** إعادة صياغة كل وصف ليبدأ بـ "Use when…" ويذكر الأعراض/المحفّزات فقط، دون تلخيص سير العمل.

---

### 🟡 P2-2 — `zoho-workflow` رقيقة

5,006 بايت، بلا `references/` ولا `assets/`. تذكر `.zoho-sprints/WORKFLOW_STATUS.md` دون قالب. لا قائمة مراحل قابلة للتحقق.

**الإصلاح:** إضافة:
- `assets/workflow-status.template.md`
- `references/phase-map.md` (المراحل + المخرجات + شروط الانتقال)
- `references/handoff-format.md`

---

### 🟡 P2-3 — لا مسار لصياغة Bug

`developer-child-item.md` يذكر Task/Bug معاً، لكن لا قالب Bug (البيئة، الخطوات، المتوقع، الفعلي، الشدة).

---

### ⚪ P3-1 — توثيق قديم

`docs/COMPARISON-AND-GAPS_AR.md` يقارن v1.1.0/v1.2.0/v2.0.0 ولا يذكر `zoho-workflow` ولا المجموعة الست.

### ⚪ P3-2 — أمر الاختبار على Windows

`node --test <dir>` يفشل؛ يعمل فقط بتمرير كل ملف.

### ⚪ P3-3 — لا CI

لا GitHub Actions ولا فحص تلقائي للـ manifest عند التعديل.

---

## 3. حالة مشروع WorldCup في Zoho (للسياق)

آخر تدقيق موثّق: **2026-11-01**، ولم تُجرَ أي كتابة.

| البند | الحالة |
|---|---|
| SP5 `SP5 Oct 26 Multi Competition` | منتهي بتاريخ 31 أكتوبر، ما زال مفتوحاً (Overdue) |
| Stories SP5 | 116–122 (29 نقطة) — كلها In progress/To do |
| Tasks SP5 | 135–142 — كلها Done |
| Backlog | 12 Stories / 50 نقطة |
| توصية مؤجلة | SP6 = 29 نقطة (118/119/121/122 Part 2 + 130/131/133 + Task bootstrap) |

> هذه الحالة قد تكون تغيّرت منذ 1 نوفمبر. أي قرار كتابة يحتاج قراءة جديدة من Zoho.

---

## 4. خطة الإصلاح المقترحة

| المرحلة | العمل | الأولوية | الجهد |
|---|---|---|---|
| 0 | Commit أساسي + Tag | P1 | 10 د |
| 1 | استعادة `large-description-writes.md` وربطه في 3 ملفات + اختبار ضغط | **P0** | 1–2 س |
| 2 | إنشاء `zoho-task-authoring` + قالب + 3 سيناريوهات | **P0** | 2–3 س |
| 3 | حزمة v3.0.0 (6 مهارات + مثبّت متعدد + manifest) | P1 | 2 س |
| 4 | توحيد الأوصاف + `zoho-workflow` references + Bug path | P2 | 2 س |
| 5 | CI + إصلاح أمر الاختبار | P3 | 1 س |

**المجموع التقديري:** 8–10 ساعات عمل.

---

## 5. الخطوة التالية الموصى بها

> **الخطوة التالية الموصى بها:** استعادة دعم الوصف الكبير باستخدام `zoho-sprints` — لأنه السبب المباشر لخطأ MCP الذي واجهته، والملف الجاهز موجود في النسخة الاحتياطية. **الشرط:** موافقتك على تعديل ملفات المهارة الحية.

البديل الأقرب: إنشاء `zoho-task-authoring` أولاً إذا كانت كتابة مهام المبرمجين هي الأولوية العملية الآن.

---

## 6. ملاحظة منهجية

هذا التقرير **تشخيص فقط**. لم أعدّل أي `SKILL.md`، ولم أستعد أي ملف، ولم ألمس Zoho. كل بند أعلاه يشير إلى ملف وقياس يمكن التحقق منه.
