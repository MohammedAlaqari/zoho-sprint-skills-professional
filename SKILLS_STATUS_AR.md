# حالة الاسكلز — v3.0.0 (2026-11-15)

## أين نحن الآن

| البند | الحالة |
|---|---|
| عدد المهارات | **7** — `zoho-workflow`, `zoho-sprints`, `user-story-authoring`, `zoho-task-authoring`, `zoho-project-knowledge`, `zoho-work-item-linking`, `zoho-release-management` |
| التطابق | `.agents/skills` و `.opencode/skills` متطابقتان بالكامل (نفس الملفات ونفس الـ SHA-256) |
| أوصاف المهارات | كلها تبدأ بـ `Use when` (اكتشاف أفضل في المحررات) |
| طبقة التنسيق | `zoho-workflow` توجّه إلى المهارات السبع وتصدر «الخطوة التالية الموصى بها» |
| حزمة التثبيت | `zoho-sprints-professional` **v3.0.0** تثبّت المهارات السبع لكل محرر |
| الاختبارات | **8** اختبارات عقد للمهارات الحية + **13** اختباراً للحزمة = **21/21 ناجحة** |
| CI | `.github/workflows/skills.yml` يعمل على Node 22 |
| Git | commit أساسي + tag `skills-baseline-2026-11-15` |

## ما تم إصلاحه

### P0-1 — الوصف الكبير (414)
- استُعيد `zoho-sprints/references/large-description-writes.md` إلى النسختين.
- استُعيد `zoho-sprints/scripts/append-description.mjs` إلى النسختين.
- رُبط في `SKILL.md` و`workflows/document-actual-delivery.md` و`references/field-completeness.md`.
- أُعيد الفاصل `##+=================================================##` إلى الملفات الثلاثة.

### P0-2 — مهارة مهام المبرمجين
- أُنشئت `zoho-task-authoring` مع:
  - `SKILL.md` (مسار Admin وDeveloper، قواعد الإسناد، فحص التكرار، القراءة بعد الكتابة).
  - `assets/task-template-ar-en.md` (قالب Task/Bug بالعربية والإنجليزية + خريطة حقول Zoho).
- رُبطت في `zoho-workflow` و`zoho-sprints` و`user-story-authoring`.

### P1 — الحزمة وGit والاختبارات
- الحزمة أصبحت متعددة المهارات (manifest جديد بمصفوفة `skills`).
- المثبّت يثبّت السبع، ويحتفظ بنسخة احتياطية، ويرفض الاستبدال بدون `--force`.
- اختبارات سلوكية للفاصل، حفظ البايتات، الروابط، التطابق، والأوصاف.
- Git baseline + tag.

### P2 — الأوصاف والتوجيه
- كل الأوصاف تبدأ بـ `Use when`.
- `zoho-workflow` توجّه إلى `zoho-task-authoring`.
- مسار Bug موثّق داخل `zoho-task-authoring`.

## أوامر التحقق

```powershell
npm run check          # 8 + 13 اختباراً + فحص الحزمة
npm run sync           # مزامنة المهارات إلى skills/ وتحديث manifest
```

## الخطوة التالية الموصى بها

مراجعة خطة تدقيق WorldCup-New المعلّقة (تغييرات الحالة والأوصاف وسبرنت نوفمبر) باستخدام `zoho-workflow`، ثم تنفيذ الكتابات المعتمدة فقط باستخدام `zoho-sprints`.

**الشرط:** موافقتك على عناصر الخطة المحددة (SP5/BL/SP6) قبل أي كتابة إلى Zoho.
