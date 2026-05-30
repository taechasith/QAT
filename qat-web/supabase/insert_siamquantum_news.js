/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');

const supabaseJsPath = "C:\\Users\\HP OMEN\\QAT\\qat-web\\node_modules\\@supabase\\supabase-js";
const { createClient } = require(supabaseJsPath);

// Manually parse .env.local from qat-web directory
const envPath = "C:\\Users\\HP OMEN\\QAT\\qat-web\\.env.local";
let envContent = '';
try {
  envContent = fs.readFileSync(envPath, 'utf8');
} catch (e) {
  console.error("Failed to read .env.local", e);
  process.exit(1);
}

const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.substring(1, value.length - 1);
    }
    env[match[1]] = value;
  }
});

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(url, key, {
  auth: { persistSession: false },
});

const slug = "siamquantum-atlas-announcement";

const title_en = "SiamQuantum Atlas Project Officially Announced to Map Thailand's Quantum Landscape";
const title_th = "เปิดตัวโครงการ \"SiamQuantum Atlas\" แพลตฟอร์มแผนที่ข้อมูลระบบนิเวศควอนตัมแห่งแรกของไทย";

const excerpt_en = "Creative Dev Lab has officially announced the development of the \"SiamQuantum Atlas,\" a comprehensive data platform mapping Thailand's quantum technology ecosystem to guide research, education, investment, and policy decisions.";
const excerpt_th = "Creative Dev Lab เปิดตัวโครงการพัฒนา \"SiamQuantum Atlas\" แพลตฟอร์มรวบรวมและวิเคราะห์ข้อมูลแผนผังระบบนิเวศเทคโนโลยีควอนตัมของประเทศไทย เพื่อกำหนดทิศทางนโยบาย การศึกษา การวิจัย และการลงทุนในอนาคต";

const body_en = `### Thailand's First Quantum Technology Ecosystem Map

Creative Dev Lab has officially announced the development plan for the **"SiamQuantum Atlas"**, a comprehensive data platform mapping Thailand's quantum technology ecosystem (Thailand Quantum Technology Ecosystem Map). The project was presented by **Kaem - Pharadee Wasuree**, a Computer Science student representing Creative Dev Lab.

### Main Project Objectives

The SiamQuantum Atlas project aims to establish a central directory and visual connection map of resources, institutions, and personnel involved in quantum technology in Thailand. It focuses on four primary domains:

1. **Research & Education:** Centralizing academic institutions, specialized courses, and research groups working on quantum theories and applications.
2. **Investment & Infrastructure:** Mapping funding allocation, key lab hardware, and infrastructure initiatives across the nation.
3. **Public Awareness:** Educating and engaging the broader public and business sector about quantum benefits.
4. **Policy & Collaboration:** Synthesizing ecosystem data to guide public policy, academic directions, and private investments in quantum computing, communication, cryptography, sensing, and AI integrations.

### Key Statement from Presenter

> "If AI is a field where many countries are already leading, quantum is a field where every country is still trying to understand, with room to experiment, build knowledge, and define new roles. Thailand should start with what is most important, which is data."
>
> — Kaem Pharadee Wasuree

### Public Launch Window

The first public version of the SiamQuantum Atlas is scheduled to launch by the **end of May 2026**. It will be open for researchers, educators, and the public to contribute, explore, and analyze the state of quantum science in Thailand.

---

Keep updated with the project's milestones via Creative Dev Lab's official Instagram accounts: [@creativedev.lab](https://www.instagram.com/creativedev.lab/) and [@creativelabth](https://www.instagram.com/creativelabth/).`;

const body_th = `### แพลตฟอร์มข้อมูลระบบนิเวศควอนตัมแห่งแรกของไทย

Creative Dev Lab (ห้องปฏิบัติการพัฒนาเทคโนโลยีสร้างสรรค์) ได้เปิดตัวแผนพัฒนาโครงการ **\"SiamQuantum Atlas\"** แพลตฟอร์มรวบรวมและวิเคราะห์ข้อมูลระบบนิเวศด้านเทคโนโลยีควอนตัมของประเทศไทย (Thailand Quantum Technology Ecosystem Map) อย่างเป็นทางการ โดยมี **แก้ม - ภารดี วะสุรีย์** นักศึกษาภาควิชาวิทยาการคอมพิวเตอร์และตัวแทนจาก Creative Dev Lab เป็นผู้นำเสนอความคืบหน้าของโครงการ

### วัตถุประสงค์หลักของโครงการ

โครงการ SiamQuantum Atlas มีเป้าหมายสำคัญในการสร้างฐานข้อมูลและระบบแผนผังการเชื่อมโยงทรัพยากรทุกภาคส่วนที่เกี่ยวข้องกับเทคโนโลยีควอนตัมในประเทศไทย เพื่อรองรับการพัฒนาใน 4 ด้านหลัก ได้แก่:

1. **การศึกษาและการวิจัย (Research & Education):** รวบรวมข้อมูลสถาบันการศึกษา หลักสูตร และกลุ่มวิจัยเชิงวิชาการด้านควอนตัม
2. **การลงทุนและโครงสร้างพื้นฐาน (Investment & Infrastructure):** แผนผังการลงทุน งบประมาณ และทรัพยากรเครื่องมืออุปกรณ์ระดับชาติ
3. **การตระหนักรู้ของสาธารณะ (Public Awareness):** เสริมสร้างความเข้าใจและการมีส่วนร่วมของประชาชนทั่วไปและภาคธุรกิจ
4. **การประสานนโยบายภาครัฐ (Policy & Collaboration):** ข้อมูลสนับสนุนเชิงรวบรวมเพื่อประกอบการตัดสินใจเชิงนโยบายระดับประเทศในด้านควอนตัมคอมพิวเตอร์ (Quantum Computing), การสื่อสารควอนตัม (Quantum Communication), การเข้ารหัสและรักษาความปลอดภัย (Quantum Cryptography) และเซนเซอร์ควอนตัม (Quantum Sensing)

### คำกล่าวสำคัญของโครงการ

> \"ถ้าปัญญาประดิษฐ์ (AI) คือขอบเขตการแข่งขันที่หลายประเทศกำลังนำลิ่วอยู่ แต่เทคโนโลยีควอนตัม (Quantum) คือขอบเขตใหม่ที่ทุกประเทศทั่วโลกยังอยู่ในช่วงพยายามทำความเข้าใจ มีพื้นที่ให้พวกเราทดลอง เรียนรู้ และสร้างบทบาทใหม่ของตัวเองได้ 
>
> ประเทศไทยควรเริ่มสร้างรากฐานจากสิ่งที่สำคัญที่สุดในยุคนี้ นั่นก็คือ... **ข้อมูล (Data)**\"
> 
> — แก้ม ภารดี วะสุรีย์

### กำหนดการเปิดตัว

โครงการ SiamQuantum Atlas มีกำหนดการเปิดตัวเวอร์ชันสาธารณะแรก (First Public Version) ภายใน**ช่วงปลายเดือนพฤษภาคม พ.ศ. 2569** นี้ ซึ่งจะเปิดให้บุคลากรทางการศึกษา นักวิจัย และผู้ที่สนใจเข้าไปร่วมใช้งาน แลกเปลี่ยนข้อมูล และสำรวจระบบนิเวศควอนตัมของไทยร่วมกัน

---

สามารถติดตามข่าวสารความคืบหน้าเพิ่มเติมของโครงการได้ทาง Instagram ของผู้พัฒนา [@creativedev.lab](https://www.instagram.com/creativedev.lab/) และ [@creativelabth](https://www.instagram.com/creativelabth/)`;

async function main() {
  console.log("Cleaning up any existing content with slug:", slug);
  await supabase.from("content_items").delete().eq("slug", slug);

  const payload = {
    content_type: "news",
    status: "draft",
    slug: slug,
    title: title_en,
    excerpt: excerpt_en,
    body_md: body_en,
    cover_image_url: null,
    external_url: "https://www.instagram.com/p/DYIBnjkknO1/?img_index=1",
    location: "Bangkok, Thailand",
    published_at: "2026-05-09T00:00:00Z",
    metadata: {
      title_th: title_th,
      excerpt_th: excerpt_th,
      body_md_th: body_th
    }
  };

  console.log("Inserting news item...");
  const { data, error } = await supabase
    .from("content_items")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    console.error("Failed to insert news item:", error.message);
    process.exit(1);
  }

  console.log("Successfully inserted news item with ID:", data.id);
}

main();
