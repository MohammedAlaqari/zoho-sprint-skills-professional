# مهارات Zoho Sprints Professional

[![Version 3.0.0](https://img.shields.io/badge/version-3.0.0-blue)](https://github.com/MohammedAlaqari/zoho-sprint-skills-professional/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-informational.svg)](../../LICENSE)
[![Node.js 22+](https://img.shields.io/badge/node-%3E%3D22-brightgreen)](https://nodejs.org/)
[![CI](https://github.com/MohammedAlaqari/zoho-sprint-skills-professional/actions/workflows/skills.yml/badge.svg)](https://github.com/MohammedAlaqari/zoho-sprint-skills-professional/actions/workflows/skills.yml)

تحمي حزمة الإصدار **3.0.0** **سبع مهارات Zoho Sprints** عبر MCP، منها صياغة قصص المستخدم ومهام المطورين، إضافة إلى الإدارة والربط والإصدارات. تقود `zoho-workflow` جلسة متعددة المراحل من الأدلة، تسأل عن القرارات المعلقة فقط، وتحفظ نقطة استئناف خاصة بالمشروع عند امتداد العمل. تشمل الحزمة دورَي Admin وDeveloper، فحص Sprint النشطة والتواريخ والتكرار، ربط Git وBMAD، وسجلًا محليًا لتجنب تكرار العناصر عند التشغيل اللاحق. راجع [مصفوفة المتطلبات](docs/REQUIREMENTS-TRACEABILITY_AR.md) للخلفية.

## المحتويات

| المهارة | الغرض |
|---|---|
| `zoho-workflow` | سلسلة عمل موجهة متعددة المراحل مع قرارات معلقة ونقاط استئناف. |
| `zoho-sprints` | عمليات Zoho Sprints الأساسية: إدارة الأدمن، الاستعرض والإنشاء والانضمام، تدقيق Git، استيراد BMAD، توثيق التسليم، الإسناد الذاتي، الفحوصات والمراجع. |
| `user-story-authoring` | صياغة قصص المستخدم: القوالب (عربي / إنجليزي)، توزيع الفرق، التقدير، حقول Zoho والسبرنتات. |
| `zoho-project-knowledge` | قاعدة معرفة المشروع للوكيل. |
| `zoho-work-item-linking` | ربط عناصر العمل وتتبع التبعيات. |
| `zoho-release-management` | إدارة الإصدارات: الترقيم وإيجاد إصدار الموبايل. |
| `zoho-task-authoring` | صياغة Task / Bug للمطور تحت قصة مسندة إليه. |

## التثبيت

يتطلب بناء الحزمة Node.js 22 أو أحدث. من داخل هذا المجلد:

```powershell
npm run check
node tools/install.mjs --editor codex --target "F:\zoho sprint skills"
```

إذا كانت نسخة مثبتة مسبقًا، توقف الأداة دون تغييرها. بعد مراجعتها، أضف `--force` للتحديث مع حفظ نسخة احتياطية في `.zoho-sprints-skill-backups/` داخل المشروع الهدف. المحررات المدعومة في أداة التثبيت: `codex`, `claude`, `opencode`, `cursor`, `kiro`, `antigravity`, `generic`. اختُبر مسار التثبيت برمجيًا؛ ظهور المهارة فعليًا في كل محرر يحتاج اختبارًا في بيئته.

## إعداد Zoho

اربط MCP وOAuth في المحرر بصورة منفصلة؛ الحزمة لا تتضمن عنوان الخادم الخاص أو الرموز. في مشروع الإعداد الحالي، المشغّل موجود في `mcp/` ويقرأ إعداد الاتصال من `docu/`، وقد نجح طلب قراءة مساحة العمل بعد النقل. في أي مشروع عمل، انسخ `.agents/skills/zoho-sprints/assets/profile.example.yaml` إلى `.zoho-sprints/profile.yaml`، ثم تحقق من الدور ومعرف مساحة العمل ومعرف مستخدم Zoho والمنطقة الزمنية. أضف أسطر `.agents/skills/zoho-sprints/assets/gitignore-zoho-sprints.txt` إذا أردت أن يبقى السجل محليًا.

## التطوير والتحقق

حرر مصدر المهارة المطلوبة داخل `.agents/skills/<skill-name>/`، ثم نفذ:

```powershell
npm run sync
npm run check
```

`sync` يولّد نسخ المهارات السبع في `skills/` و`manifest.json` بصورة حتمية. `check` يشغّل الاختبارات ثم يتحقق من تطابق المصدر والنسخ الموزعة والروابط والعقد. ملف [تصميم الحزمة](docs/ARCHITECTURE_AR.md) يشرح المسؤوليات.

## إعدادات المحررات

راجع [دليل المحررات](editor-guides/README_AR.md) لتثبيت المهارة في كل محرر مدعوم.

## حدود مهمة

المهارة ليست خادم MCP ولا نظام صلاحيات. عمليات Zoho تعتمد على الأدوات والصلاحيات الحية. تدقيق Git أو BMAD لا يبدأ تلقائيًا بمجرد التثبيت، ولا تُنشأ أي عناصر في Zoho أثناء بناء الحزمة.

## الترخيص

مُرخَّص تحت [رخصة MIT](../../LICENSE).

للمستخدم والعرض التوضيحي: [دليل الاستخدام العربي](../../SKILLS_USAGE_GUIDE_AR.md)، [الدليل الإنجليزي](../../SKILLS_USAGE_GUIDE_EN.md)، [محاكاة السيناريوهات العربية](../../SCENARIO_PLAYBOOK_AR.md)، و[المحاكاة الإنجليزية](../../SCENARIO_PLAYBOOK_EN.md).

ابدأ من [الدليل التفصيلي لربط MCP وتحديد المشروع واستخدام المهارة](GETTING_STARTED_MCP_AR.md).
