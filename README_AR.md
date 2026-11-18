# مهارات Zoho Sprints Professional

[![Version 3.0.0](https://img.shields.io/badge/version-3.0.0-blue)](https://github.com/MohammedAlaqari/zoho-sprint-skills-professional/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-informational.svg)](../LICENSE)
[![Node.js 22+](https://img.shields.io/badge/node-%3E%3D22-brightgreen)](https://nodejs.org/)
[![CI](https://github.com/MohammedAlaqari/zoho-sprint-skills-professional/actions/workflows/skills.yml/badge.svg)](https://github.com/MohammedAlaqari/zoho-sprint-skills-professional/actions/workflows/skills.yml)

**مجموعة مهارات Zoho Sprints Professional** هي مجموعة مهارات للوكيل الذكي تحوّل مساعد البرمجة إلى مساعد منظم لمشاريع **Zoho Sprints** — التخطيط، صياغة القصص، وتسليم العمل عبر اتصالك الخاص بخادم Zoho Sprints MCP.

تحمي النسخة **3.0.0** **سبع مهارات**، منها سلسلة العمل الموجهة القابلة للاستئناف، وصياغة قصص المستخدم ومهام المطورين، وفحوصات القراءة والكتابة، وعقد السجل المحلي، وتوليد توزيعات مهارات Portable.

> لا تتضمن الحزمة عنوان خادم Zoho أو رموز OAuth أو بيانات شخصية. اربط خادمك الخاص واحفظ الأسرار محليًا.

## نظرة عامة

يساعد هذا الحزمة الوكيل على العمل في مشاريع Zoho Sprints بطريقة متحكم بها وقابلة للتدقيق:

- **سلسلة عمل موجهة وقابلة للاستئناف** — خريطة المراحل مبنية على الأدلة، وطرح الأسئلة عند القرارات المعلقة فقط، ونقطة استئناف خاصة لكل مشروع.
- **صياغة قصص ومهام** — قصص المستخدم ومهام المطورين مع معايير القبول والترشيح والتكرار ومدة Sprint.
- **فحوصات القراءة / الكتابة** — فحص الاتصال وتغطية القراءة والتحقق من الكتابة واستمرارية التدقيق قبل التنفيذ.
- **سجل محلي** — سجل التغييرات والعمليات المعلقة وتقارير التدقيق داخل مشروع الهدف.

## المهارات

| المهارة | المسؤولية |
|---|---|
| `zoho-workflow` | سلسلة عمل موجهة متعددة المراحل مع قرارات معلقة ونقاط استئناف. |
| `zoho-sprints` | عمليات Zoho Sprints الأساسية: إدارة الأدمن، الاستعرض والإنشاء والانضمام، تدقيق Git، استيراد BMAD، توثيق التسليم، الإسناد الذاتي، الفحوصات والمراجع. |
| `user-story-authoring` | صياغة قصص المستخدم: القوالب (عربي / إنجليزي)، توزيع الفرق، التقدير، حقول Zoho والسبرنتات. |
| `zoho-project-knowledge` | قاعدة معرفة المشروع للوكيل. |
| `zoho-work-item-linking` | ربط عناصر العمل وتتبع التبعيات. |
| `zoho-release-management` | إدارة الإصدارات: الترقيم وإيجاد إصدار الموبايل. |
| `zoho-task-authoring` | صياغة Task / Bug للمطور تحت قصة مسندة إليه. |

## المتطلبات

- Node.js الإصدار 22 أو أحدث (لتشغيل أدوات الحزمة).
- وكيل برمجة كامل يدعم المهارات والـ MCP (Claude Code، Codex، Cursor، Kiro، OpenCode، Antigravity، أو بيئة عامة).
- حساب Zoho باتصال Zoho Sprints MCP يعمل وصلاحيات صالحة.

## التثبيت

لا تتضمن الحزمة عنوان خادم Zoho ولا بيانات الاعتماد.

من داخل مجلد `zoho-sprints-professional`:

```powershell
cd 'F:\zoho sprint skills\zoho-sprints-professional'
npm run check
node tools/install.mjs --editor codex --target 'C:\path\to\your\project'
```

المحررات المدعومة: `codex`, `claude`, `opencode`, `cursor`, `kiro`, `antigravity`, `generic`.

يتم رفض تثبيت نسخة موجودة ما لم يُصرَّح بـ `--force` صراحةً. راجع النسخة الحالية أولًا، والنسخ الاحتياطية تُحفظ في `.zoho-sprints-skill-backups/`.

## البدء السريع

1. اربط خادم MCP في وكيلك.
2. أنشئ ملف `.zoho-sprints/profile.yaml` من `assets/profile.example.yaml` داخل المهارة (الدور، مساحة العمل، المستخدم، المشروع، المنطقة الزمنية).
3. شغّل فحص الاتصال ثم تبع سلسلة عمل `zoho-workflow`.

## الوثائق

| الجمهور | الدليل |
|---|---|
| العربية | [دليل الاستخدام](../SKILLS_USAGE_GUIDE_AR.md) · [محاكيات السيناريوهات](../SCENARIO_PLAYBOOK_AR.md) |
| الإنجليزية | [User guide](../SKILLS_USAGE_GUIDE_EN.md) · [Scenarios](../SCENARIO_PLAYBOOK_EN.md) |
| التقنية | [دليل البدء وربط MCP](../zoho-sprints-professional/GETTING_STARTED_MCP_AR.md) · [مخطط المعمارية](../zoho-sprints-professional/docs/ARCHITECTURE_AR.md) |

## التطوير

```powershell
npm run check   # تشغيل الاختبارات وفحص تطابق الحزمة
npm run sync    # إعادة توليد المهارات والتوزيعات وتحديث manifest
npm test        # تشغيل اختبارات العقد
```

يقوم CI في GitHub Actions بتشغيل نفس الفحوصات عبر workflow `skills-ci`.

## الحدود

- التصميم يعتمد على MCP فقط: لا يُستدعى واجهة Zoho API مباشرة ولا تتضمن الحزمة بيانات الاعتماد.
- تبقى كتابة الوصف الطويلة معلقة حتى تدعم أدوات Zoho MCP الحالية عملية إرسال الطلب.

## الترخيص

مُرخَّص تحت [رخصة MIT](LICENSE).

---

**النسخة العربية:** [مهارات Zoho Sprints Professional](../README_AR.md) · **تقرير الإصدار:** [zoho-sprints-professional/RELEASE-REPORT.md](zoho-sprints-professional/RELEASE-REPORT.md)
