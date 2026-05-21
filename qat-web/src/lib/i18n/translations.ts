export type Locale = "en" | "th";

export const t = {
  en: {
    locale: "en" as Locale,
    logo: { name: "QAT Assoc.", tagline: "Quantum Art Thailand" },
    nav: {
      atlas: "Atlas",
      game: "Game",
      course: "Course",
      exhibition: "Exhibition",
      research: "Research",
      news: "News",
      talk: "Talk",
      experiment: "Experiment",
      video: "Video",
      login: "Login",
      myAccount: "My Account",
      signOut: "Sign out",
    },
    footer: {
      tagline:
        "Connecting quantum science, art, education, and public imagination across Thailand and beyond.",
      copyright: (year: number) => `© ${year} QAT Assoc. · CreativeLabTH Group`,
    },
    splash: {
      initializing: "Initializing Quantum Realm",
      ready: "SYSTEM READY",
      interfaceReady: "Interface connection established",
      preparing: "Preparing artistic-scientific interface",
    },
    auth: {
      login: {
        eyebrow: "Sign in",
        heading: "Welcome back",
        email: "Email",
        emailPlaceholder: "you@example.com",
        password: "Password",
        forgotPassword: "Forgot password?",
        signingIn: "Signing in…",
        signIn: "Sign in",
        noAccount: "No account?",
        createOne: "Create one",
        accountCreated: "Account created — sign in to continue.",
        tooManyAttempts: "Too many failed attempts",
        tooManyAttemptsDesc:
          "Reset your password to regain access to your account.",
        resetPassword: "Reset password",
        tryAgain: "Try again anyway",
        havingTrouble: "Having trouble?",
        resetYourPassword: "Reset your password",
        incorrectCredentials: (n: number) =>
          `Incorrect email or password. ${n} attempt${n === 1 ? "" : "s"} remaining.`,
        emailNotConfirmed:
          "Your email is not confirmed yet. Check your inbox or contact the admin.",
      },
      register: {
        eyebrow: "Join QAT",
        heading: "Create account",
        email: "Email",
        emailPlaceholder: "you@example.com",
        password: "Password",
        passwordPlaceholder: "Min. 8 characters",
        confirmPassword: "Confirm password",
        confirmPlaceholder: "Repeat password",
        creating: "Creating…",
        createAccount: "Create account",
        alreadyHaveAccount: "Already have an account?",
        signIn: "Sign in",
        passwordsMismatch: "Passwords do not match.",
        passwordTooShort: "Password must be at least 8 characters.",
        alreadyExists:
          "An account with this email already exists. Sign in instead.",
        invalidEmail: "Please enter a valid email address.",
      },
      forgotPassword: {
        eyebrow: "Password reset",
        heading: "Forgot your password?",
        description: "Enter your email and we’ll send a secure reset link.",
        email: "Email",
        emailPlaceholder: "you@example.com",
        sending: "Sending…",
        sendResetLink: "Send reset link",
        backToSignIn: "Back to sign in",
        checkInbox: "Check your inbox",
        resetLinkSent: "Reset link sent",
        sentMessage: (email: string) =>
          `A password reset link was sent to ${email}. Click the link in that email to set a new password.`,
        spamNote:
          "Didn’t receive it? Check your spam folder or try again.",
        sendAgain: "Send again",
      },
    },
    card: {
      readMore: "Read more",
    },
    contentDetail: {
      noContent: "More details will be added by the QAT team.",
      openLink: "Open related link",
      member: "Member",
    },
    account: {
      eyebrow: "Your profile",
      unnamedExplorer: "Unnamed explorer",
      settings: "Settings",
      emailUpdates: "Email updates",
      emailUpdatesDesc: "Receive news and upcoming event notifications.",
      password: "Password",
      passwordDesc: "Request a reset link to your email.",
      changePassword: "Change password",
      avatar: "Avatar",
      achievements: "Achievements",
    },
    profileName: {
      displayName: "Display name",
      placeholder: "Your name",
      saving: "Saving…",
      save: "Save",
      saved: "Saved!",
      failed: "Save failed. Try again.",
    },
    notifications: {
      toggle: "Receive email updates about QAT events and news",
      failed: "Update failed. Please try again.",
      enabled: "You will receive update emails.",
      disabled: "Update emails disabled.",
    },
    hero: {
      eyebrow: "CreativeLabTH Group International Initiative",
      title: "Quantum Art Thailand Association",
      description:
        "A public platform connecting quantum science, art, interaction, and future culture — where the hardest ideas become the most human.",
      discoverMission: "Discover the mission",
      exploreDestinations: "Explore destinations",
      scrollHint: "Scroll to explore",
    },
    mission: {
      eyebrow: "What we do",
      heading: "Where quantum science meets human imagination",
      mission1Eyebrow: "Mission I",
      mission1Title: "Making hard science public",
      mission1p1:
        "Quantum science sits at the edge of what we can imagine — but it need not be hidden behind academic language. QAT uses visual storytelling, interaction design, and artistic practice to bring quantum concepts closer to students, creators, and curious minds everywhere.",
      mission1p2:
        "We believe science becomes culture when it is made accessible. When a person can see, feel, or play with an idea, it stops being abstract and starts becoming real.",
      mission2Eyebrow: "Mission II",
      mission2Title: "Art as a scientific instrument",
      mission2p1:
        "Art and science are not opposites. Artists ask questions that scientists have not yet written down. At QAT, we invite artists, designers, and creative technologists to work beside researchers — not to illustrate science, but to help imagine it differently.",
      mission2p2:
        "Artistic experiments become a way to test assumptions, reframe problems, and open new corridors of imagination in the quantum world.",
    },
    portal: {
      eyebrow: "Nine destinations",
      heading: "Where do you want to go?",
      whatsHappening: "What’s happening",
      visit: "Visit",
      explore: "Explore",
      destinations: [
        {
          title: "Atlas",
          description:
            "Explore the interactive quantum knowledge atlas — an external creative project by CreativeLabTH Group.",
          badge: "External",
        },
        {
          title: "Game",
          description:
            "Interactive quantum learning experiences and creative experiments.",
        },
        {
          title: "Course",
          description:
            "Quantum science and creative technology courses for all levels.",
        },
        {
          title: "Exhibition",
          description:
            "Archive of past QAT exhibitions, installations, and art events.",
        },
        {
          title: "Research & Articles",
          description:
            "Academic papers, essays, and research notes from QAT collaborators.",
        },
        {
          title: "News",
          description:
            "Latest updates, announcements, and stories from Quantum Art Thailand.",
        },
        {
          title: "Talk",
          description:
            "Lectures, discussions, and conversations at the intersection of quantum science and culture.",
        },
        {
          title: "Experiment",
          description:
            "Interactive and conceptual experiments exploring quantum phenomena through art and design.",
        },
        {
          title: "Video",
          description:
            "Documentary, artistic, and educational video works produced under the QAT initiative.",
        },
      ],
    },
    pages: {
      game: {
        eyebrow: "Playground",
        title: "Game",
        description:
          "Interactive quantum experiences — particle simulators, puzzles, and conceptual games that make the invisible tangible.",
        emptyTitle: "No games yet",
        emptyDescription:
          "Quantum games and interactive works will appear here when released.",
      },
      course: {
        eyebrow: "Learning Lab",
        title: "Course",
        description:
          "Structured programs bridging quantum science and creative practice — workshops, courses, and guided explorations.",
        emptyTitle: "No courses yet",
        emptyDescription:
          "Courses and workshops will appear here once published. New programs are in development.",
      },
      exhibition: {
        eyebrow: "Gallery",
        title: "Exhibition",
        description:
          "Curated installations and digital exhibitions mapping the boundary where physics becomes cultural experience.",
        emptyTitle: "No exhibitions yet",
        emptyDescription:
          "Exhibition documentation and upcoming shows will be listed here as they open.",
      },
      research: {
        eyebrow: "Lab Notes",
        title: "Research",
        description:
          "Published findings, theoretical explorations, and field notes from the QAT collective connecting science and creative practice.",
        emptyTitle: "No articles yet",
        emptyDescription:
          "Research articles and papers will appear here once published.",
      },
      news: {
        eyebrow: "Dispatch",
        title: "News",
        description:
          "Updates from the quantum art frontier — events, partnerships, grants, and announcements from QAT Assoc.",
        emptyTitle: "No news yet",
        emptyDescription:
          "Announcements and updates will appear here as they are published.",
      },
      talk: {
        eyebrow: "Lecture Series",
        title: "Talk",
        description:
          "Recorded lectures, panel conversations, and public dialogues at the intersection of quantum science and culture.",
        emptyTitle: "No talks yet",
        emptyDescription:
          "Talk recordings and lecture transcripts will appear here once published.",
      },
      experiment: {
        eyebrow: "Field Work",
        title: "Experiment",
        description:
          "Live experiments, prototypes, and works-in-progress — open research from QAT’s ongoing creative investigations.",
        emptyTitle: "No experiments yet",
        emptyDescription:
          "Experimental works and prototypes will be shared here as they develop.",
      },
      video: {
        eyebrow: "Archive",
        title: "Video",
        description:
          "Filmed documentation of exhibitions, performances, and educational programs produced under the QAT initiative.",
        emptyTitle: "No videos yet",
        emptyDescription:
          "Video documentation and short films will appear here once published.",
      },
    },
    engagement: {
      unlike: "Unlike",
      like: "Like",
      signInToLike: "Sign in to like",
    },
    empty: { note: "Check back soon", errorNote: "Content temporarily unavailable" },
    comments: {
      heading: "Comments",
      placeholder: "Add a comment…",
      post: "Post",
      posting: "Posting…",
      signIn: "Sign in",
      signInPrompt: "to leave a comment.",
      noComments: "No comments yet. Be the first.",
      deleteLabel: "Delete comment",
      charLimit: "/1000",
    },
  },

  th: {
    locale: "th" as Locale,
    logo: { name: "QAT Assoc.", tagline: "Quantum Art Thailand" },
    nav: {
      atlas: "Atlas",
      game: "เกม",
      course: "หลักสูตร",
      exhibition: "นิทรรศการ",
      research: "งานวิจัย",
      news: "ข่าวสาร",
      talk: "งานเสวนา",
      experiment: "ผลงานทดลอง",
      video: "วิดีโอ",
      login: "เข้าสู่ระบบ",
      myAccount: "บัญชีของฉัน",
      signOut: "ออกจากระบบ",
    },
    footer: {
      tagline:
        "เชื่อมโยงวิทยาศาสตร์ควอนตัม ศิลปะ การศึกษา และจินตนาการของสาธารณชน ทั้งในประเทศไทยและต่างประเทศ",
      copyright: (year: number) => `© ${year} QAT Assoc. · CreativeLabTH Group`,
    },
    splash: {
      initializing: "กำลังเข้าสู่โลกควอนตัม",
      ready: "ระบบพร้อมใช้งาน",
      interfaceReady: "เชื่อมต่อหน้าปฏิสัมพันธ์สำเร็จ",
      preparing: "กำลังจัดเตรียมระบบปฏิสัมพันธ์สร้างสรรค์",
    },
    auth: {
      login: {
        eyebrow: "เข้าสู่ระบบ",
        heading: "ยินดีต้อนรับกลับมา",
        email: "อีเมล",
        emailPlaceholder: "you@example.com",
        password: "รหัสผ่าน",
        forgotPassword: "ลืมรหัสผ่าน?",
        signingIn: "กำลังเข้าสู่ระบบ…",
        signIn: "เข้าสู่ระบบ",
        noAccount: "ยังไม่มีบัญชีใช่หรือไม่?",
        createOne: "สร้างบัญชีใหม่",
        accountCreated: "สร้างบัญชีสำเร็จ — กรุณาเข้าสู่ระบบเพื่อเริ่มใช้งาน",
        tooManyAttempts: "พยายามเข้าสู่ระบบเกินจำนวนครั้งที่กำหนด",
        tooManyAttemptsDesc: "กรุณารีเซ็ตรหัสผ่านเพื่อกลับเข้าใช้งานบัญชีของคุณอีกครั้ง",
        resetPassword: "รีเซ็ตรหัสผ่าน",
        tryAgain: "ลองใหม่อีกครั้ง",
        havingTrouble: "พบปัญหาในการเข้าสู่ระบบ?",
        resetYourPassword: "รีเซ็ตรหัสผ่านของคุณ",
        incorrectCredentials: (n: number) =>
          `อีเมลหรือรหัสผ่านไม่ถูกต้อง เหลือโอกาสทดลองอีก ${n} ครั้ง`,
        emailNotConfirmed:
          "อีเมลนี้ยังไม่ได้รับการยืนยัน โปรดตรวจสอบกล่องข้อความอีเมลของคุณ หรือติดต่อผู้ดูแลระบบ",
      },
      register: {
        eyebrow: "เข้าร่วม QAT",
        heading: "สร้างบัญชีใหม่",
        email: "อีเมล",
        emailPlaceholder: "you@example.com",
        password: "รหัสผ่าน",
        passwordPlaceholder: "รหัสผ่านอย่างน้อย 8 ตัวอักษร",
        confirmPassword: "ยืนยันรหัสผ่าน",
        confirmPlaceholder: "กรอกรหัสผ่านอีกครั้งเพื่อยืนยัน",
        creating: "กำลังสร้างบัญชี…",
        createAccount: "สร้างบัญชีผู้ใช้",
        alreadyHaveAccount: "มีบัญชีอยู่แล้วใช่หรือไม่?",
        signIn: "เข้าสู่ระบบ",
        passwordsMismatch: "รหัสผ่านไม่ตรงกัน",
        passwordTooShort: "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร",
        alreadyExists: "มีบัญชีผู้ใช้ที่ลงทะเบียนด้วยอีเมลนี้แล้ว กรุณาเข้าสู่ระบบแทน",
        invalidEmail: "กรุณากรอกอีเมลที่ถูกต้อง",
      },
      forgotPassword: {
        eyebrow: "รีเซ็ตรหัสผ่าน",
        heading: "ลืมรหัสผ่านใช่หรือไม่?",
        description: "กรุณาระบุอีเมลของคุณเพื่อรับลิงก์สำหรับรีเซ็ตรหัสผ่านอย่างปลอดภัย",
        email: "อีเมล",
        emailPlaceholder: "you@example.com",
        sending: "กำลังส่งข้อมูล…",
        sendResetLink: "ส่งลิงก์รีเซ็ตรหัสผ่าน",
        backToSignIn: "กลับสู่หน้าเข้าสู่ระบบ",
        checkInbox: "โปรดตรวจสอบกล่องข้อความในอีเมลของคุณ",
        resetLinkSent: "ส่งลิงก์สำหรับตั้งรหัสผ่านใหม่เรียบร้อยแล้ว",
        sentMessage: (email: string) =>
          `ระบบได้ส่งลิงก์รีเซ็ตรหัสผ่านไปยัง ${email} เรียบร้อยแล้ว กรุณาคลิกลิงก์ดังกล่าวเพื่อกำหนดรหัสผ่านใหม่`,
        spamNote:
          "หากไม่พบอีเมล โปรดตรวจสอบในกล่องจดหมายขยะ (Spam) หรือลองใหม่อีกครั้ง",
        sendAgain: "ส่งอีกครั้ง",
      },
    },
    card: {
      readMore: "อ่านรายละเอียดเพิ่มเติม",
    },
    contentDetail: {
      noContent: "ทีมงาน QAT กำลังดำเนินการเพิ่มรายละเอียดเนื้อหาเร็ว ๆ นี้",
      openLink: "เปิดลิงก์ที่เกี่ยวข้อง",
      member: "สมาชิก",
    },
    account: {
      eyebrow: "โปรไฟล์ของคุณ",
      unnamedExplorer: "นักสำรวจนิรนาม",
      settings: "การตั้งค่า",
      emailUpdates: "รับข้อมูลข่าวสารทางอีเมล",
      emailUpdatesDesc: "รับข้อมูลข่าวสารและประกาศกิจกรรมสำคัญจากทางสมาคม",
      password: "รหัสผ่าน",
      passwordDesc: "ส่งคำขอลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของคุณ",
      changePassword: "เปลี่ยนรหัสผ่าน",
      avatar: "รูปโปรไฟล์",
      achievements: "รางวัลและความสำเร็จ",
    },
    profileName: {
      displayName: "ชื่อที่แสดง",
      placeholder: "ระบุชื่อของคุณ",
      saving: "กำลังบันทึก…",
      save: "บันทึกข้อมูล",
      saved: "บันทึกสำเร็จ!",
      failed: "บันทึกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
    },
    notifications: {
      toggle: "รับอีเมลข่าวสารประชาสัมพันธ์และอัปเดตกิจกรรมจาก QAT",
      failed: "ปรับปรุงข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
      enabled: "เปิดรับข่าวสารอัปเดตทางอีเมลเรียบร้อยแล้ว",
      disabled: "ปิดการรับข่าวสารอัปเดตทางอีเมลเรียบร้อยแล้ว",
    },
    hero: {
      eyebrow: "CreativeLabTH Group International Initiative",
      title: "Quantum Art Thailand Association",
      description:
        "พื้นที่สร้างสรรค์สาธารณะที่เชื่อมประสานวิทยาศาสตร์ควอนตัม ศิลปะ สื่อปฏิสัมพันธ์ และวัฒนธรรมแห่งอนาคต — เพื่อเปลี่ยนแนวคิดทางวิทยาศาสตร์ที่ซับซ้อนที่สุดให้กลายเป็นเรื่องราวที่เข้าถึงได้และงดงาม",
      discoverMission: "ศึกษาพันธกิจของเรา",
      exploreDestinations: "เริ่มต้นเดินทาง",
      scrollHint: "เลื่อนลงเพื่อสำรวจ",
    },
    mission: {
      eyebrow: "สิ่งที่เรามุ่งมั่นทำ",
      heading: "เมื่อวิทยาศาสตร์ควอนตัมบรรจบกับจินตนาการของมนุษย์",
      mission1Eyebrow: "พันธกิจที่ 1",
      mission1Title: "สื่อสารวิทยาศาสตร์ยากให้เข้าถึงง่ายในสังคม",
      mission1p1:
        "วิทยาศาสตร์ควอนตัมตั้งอยู่บนพรมแดนแห่งจินตนาการอันไกลโพ้น แต่ไม่จำเป็นต้องถูกปิดกั้นอยู่เบื้องหลังภาษาวิชาการที่ซับซ้อน สมาคม QAT จึงผสานพลังของการเล่าเรื่องผ่านภาพ (Visual Storytelling) การออกแบบปฏิสัมพันธ์ (Interaction Design) และกระบวนการทางศิลปะ เพื่อถ่ายทอดแนวคิดควอนตัมให้เข้าใกล้เยาวชน นักสร้างสรรค์ และผู้คนทั่วไปในทุกหนแห่ง",
      mission1p2:
        "เราเชื่อมั่นว่าวิทยาศาสตร์จะกลายเป็นส่วนหนึ่งของวัฒนธรรมร่วมสมัยได้ก็ต่อเมื่อทำให้จับต้องได้จริง เมื่อผู้คนสามารถมองเห็น สัมผัส หรือสนุกไปกับแนวคิดเหล่านั้น วิทยาศาสตร์จะไม่ใช่เรื่องที่เป็นนามธรรมอีกต่อไป แต่จะแปรเปลี่ยนเป็นความจริงที่ทุกคนเข้าใจและเข้าถึงได้",
      mission2Eyebrow: "พันธกิจที่ 2",
      mission2Title: "ใช้ศิลปะเป็นเครื่องมือตั้งโจทย์ร่วมทางวิทยาศาสตร์",
      mission2p1:
        "ศิลปะและวิทยาศาสตร์ไม่ใช่สิ่งแปลกแยกจากกัน บ่อยครั้งที่ศิลปินถามคำถามในมุมมองที่วิจัยทางวิทยาศาสตร์อาจจะยังไม่ได้เริ่มต้นนึกถึง ที่สมาคม QAT เราเชิญชวนศิลปิน นักออกแบบ และนักเทคโนโลยีสร้างสรรค์มาทำงานร่วมกับนักวิจัยวิชาการ — ไม่ใช่เพียงเพื่อวาดภาพประกอบวิทยาศาสตร์ แต่เพื่อร่วมกันจินตนาการและเปิดมุมมองใหม่ ๆ ที่ต่างไปจากเดิม",
      mission2p2:
        "การทดลองเชิงสร้างสรรค์ทางศิลปะจึงกลายเป็นเครื่องมือท้าทายสมมติฐานเดิม ๆ จัดกระบวนการเรียนรู้และตั้งโจทย์คำถามใหม่ พร้อมทั้งบุกเบิกหนทางจินตนาการใหม่ ๆ ในโลกควอนตัม",
    },
    portal: {
      eyebrow: "เก้าจุดหมายปลายทาง",
      heading: "เลือกจุดหมายการเรียนรู้ของคุณ",
      whatsHappening: "ข่าวสารและกิจกรรมล่าสุด",
      visit: "เข้าชมผลงาน",
      explore: "เริ่มต้นสำรวจ",
      destinations: [
        {
          title: "Atlas",
          description:
            "สำรวจแผนที่นำทางความรู้ควอนตัมเชิงปฏิสัมพันธ์ — โครงการสร้างสรรค์ภายนอกโดยกลุ่ม CreativeLabTH",
          badge: "ลิงก์ภายนอก",
        },
        {
          title: "เกม",
          description:
            "สัมผัสประสบการณ์เรียนรู้ควอนตัมผ่านสื่อปฏิสัมพันธ์และเกมทดลองเชิงสร้างสรรค์",
        },
        {
          title: "หลักสูตร",
          description:
            "หลักสูตรการเรียนรู้วิทยาศาสตร์ควอนตัมและเทคโนโลยีสร้างสรรค์สำหรับผู้เรียนทุกระดับ",
        },
        {
          title: "นิทรรศการ",
          description:
            "รวบรวมบันทึกนิทรรศการ ศิลปะการจัดวาง (Art Installations) และงานศิลปะต่าง ๆ ที่ผ่านมาของ QAT",
        },
        {
          title: "งานวิจัย",
          description:
            "บทความวิชาการ เรียงความประกอบแนวคิด และบันทึกผลการวิจัยจากคณะทำงานและภาคีเครือข่ายของ QAT",
        },
        {
          title: "ข่าวสาร",
          description:
            "ติดตามข่าวสารประชาสัมพันธ์ ประกาศสำคัญ และเรื่องราวล่าสุดจากสมาคม Quantum Art Thailand",
        },
        {
          title: "งานเสวนา",
          description:
            "คลิปบันทึกงานเสวนา การบรรยายวิชาการ และบทสนทนา ณ จุดตัดของวิทยาศาสตร์ควอนตัมและวัฒนธรรมร่วมสมัย",
        },
        {
          title: "ผลงานทดลอง",
          description:
            "ผลงานทดลองเชิงปฏิสัมพันธ์และเชิงแนวคิดเพื่อร่วมค้นหาปรากฏการณ์ควอนตัมผ่านเลนส์ของศิลปะและการออกแบบ",
        },
        {
          title: "วิดีโอ",
          description:
            "ผลงานภาพยนตร์สารคดี วิดีโออาร์ต และสื่อวิดีโอเพื่อการศึกษาที่ผลิตขึ้นภายใต้โครงการ QAT",
        },
      ],
    },
    pages: {
      game: {
        eyebrow: "พื้นที่การเรียนรู้",
        title: "เกม",
        description:
          "สัมผัสประสบการณ์ควอนตัมเชิงปฏิสัมพันธ์ผ่านโปรแกรมจำลองอนุภาค เกมปริศนา และเกมเชิงแนวคิดที่ช่วยเปลี่ยนสิ่งล่องหนให้สัมผัสได้จริง",
        emptyTitle: "ยังไม่มีผลงานเกมเผยแพร่ในขณะนี้",
        emptyDescription:
          "ผลงานเกมและการเรียนรู้เชิงปฏิสัมพันธ์จะปรากฏให้เข้าชมที่นี่เมื่อเผยแพร่แล้ว",
      },
      course: {
        eyebrow: "หลักสูตรและเวิร์กชอป",
        title: "หลักสูตร",
        description:
          "หลักสูตรและกระบวนการเรียนรู้ที่เชื่อมโยงวิทยาศาสตร์ควอนตัมกับการลงมือปฏิบัติจริง ทั้งในรูปแบบการเรียนรู้เฉพาะทาง เวิร์กชอป และการเดินทางนำทางสำรวจ",
        emptyTitle: "ยังไม่มีหลักสูตรเปิดสอนในขณะนี้",
        emptyDescription:
          "หลักสูตรและเวิร์กชอปใหม่ ๆ จะปรากฏให้จองเข้าเรียนที่นี่เมื่อเริ่มเปิดรับสมัคร ซึ่งขณะนี้เรากำลังพัฒนาโปรแกรมอย่างต่อเนื่อง",
      },
      exhibition: {
        eyebrow: "พื้นที่จัดแสดงงานศิลปะ",
        title: "นิทรรศการ",
        description:
          "รวบรวมนิทรรศการทั้งในพื้นที่จริงและรูปแบบดิจิทัลที่มุ่งสร้างสรรค์และสะท้อนจุดตัดระหว่างหลักฟิสิกส์และประสบการณ์ทางวัฒนธรรมของมนุษย์",
        emptyTitle: "ยังไม่มีนิทรรศการจัดแสดงในขณะนี้",
        emptyDescription:
          "บันทึกข้อมูลนิทรรศการในอดีตและนิทรรศการชุดถัดไปที่กำลังจะมาถึงจะปรากฏที่นี่เมื่อเริ่มจัดแสดง",
      },
      research: {
        eyebrow: "บันทึกวิจัยและพัฒนา",
        title: "งานวิจัย",
        description:
          "ผลการศึกษาค้นคว้า การสำรวจกรอบทฤษฎี และบันทึกการเรียนรู้ภาคสนามโดยกลุ่มสมาคม QAT เพื่อร่วมสร้างสะพานเชื่อมระหว่างวิทยาศาสตร์กับการปฏิบัติเชิงสร้างสรรค์",
        emptyTitle: "ยังไม่มีบทความวิชาการเผยแพร่ในขณะนี้",
        emptyDescription:
          "งานวิจัยและบทความวิชาการใหม่ ๆ จะแสดงให้ท่านศึกษาค้นคว้าได้ที่นี่เมื่อเผยแพร่",
      },
      news: {
        eyebrow: "ข่าวสารประชาสัมพันธ์",
        title: "ข่าวสาร",
        description:
          "ติดตามข่าวคราวความเคลื่อนไหวจากแนวหน้าศิลปะควอนตัม ทั้งกิจกรรมล่าสุด ข้อมูลความร่วมมือ ทุนวิจัยพัฒนา และประกาศประชาสัมพันธ์จากสมาคม QAT",
        emptyTitle: "ยังไม่มีข่าวสารในขณะนี้",
        emptyDescription:
          "ประกาศแจ้งข่าวสารและกิจกรรมล่าสุดจะแสดงให้คุณทราบที่นี่เมื่อเผยแพร่แล้ว",
      },
      talk: {
        eyebrow: "ชุดงานเสวนาและการบรรยาย",
        title: "งานเสวนา",
        description:
          "รวบรวมบันทึกวิดีโองานเสวนา การบรรยายทางวิชาการ และเวทีสนทนาสาธารณะ ณ จุดบรรจบระหว่างวิทยาศาสตร์ควอนตัมและมิติทางวัฒนธรรม",
        emptyTitle: "ยังไม่มีคลิปบันทึกงานเสวนาในขณะนี้",
        emptyDescription:
          "วิดีโอบันทึกงานบรรยายและเอกสารสรุปบทสนทนาจะแสดงที่นี่เมื่อได้รับการเผยแพร่เรียบร้อยแล้ว",
      },
      experiment: {
        eyebrow: "ห้องทดลองสร้างสรรค์",
        title: "ผลงานทดลอง",
        description:
          "นำเสนอผลงานทดลองสด ชิ้นงานต้นแบบ (Prototype) และโครงงานที่อยู่ระหว่างการพัฒนา ซึ่งเปิดโอกาสให้ร่วมเรียนรู้ผ่านกระบวนการวิจัยเชิงสร้างสรรค์ของสมาคม QAT",
        emptyTitle: "ยังไม่มีผลงานทดลองจัดแสดงในขณะนี้",
        emptyDescription:
          "ชิ้นงานทดลองและผลงานต้นแบบจะปรากฏให้เข้าชมและเรียนรู้ร่วมกันที่นี่เมื่อขั้นตอนการพัฒนาพร้อม",
      },
      video: {
        eyebrow: "คลังวิดีโอบันทึก",
        title: "วิดีโอ",
        description:
          "บันทึกผลงานในรูปแบบสื่อวิดีโอ ทั้งการเก็บบันทึกภาพนิทรรศการ ศิลปะการแสดง และสื่อกระบวนการเรียนรู้ที่สร้างสรรค์ขึ้นภายใต้โครงการของสมาคม QAT",
        emptyTitle: "ยังไม่มีเนื้อหาวิดีโอจัดแสดงในขณะนี้",
        emptyDescription:
          "สื่อวิดีโอบันทึกกิจกรรมและภาพยนตร์สั้นสร้างสรรค์ต่าง ๆ จะจัดแสดงขึ้นที่นี่เมื่อเผยแพร่แล้ว",
      },
    },
    engagement: {
      unlike: "ยกเลิกการถูกใจ",
      like: "ถูกใจ",
      signInToLike: "เข้าสู่ระบบเพื่อกดถูกใจ",
    },
    empty: {
      note: "โปรดติดตามรายละเอียดเพิ่มเติมเร็ว ๆ นี้",
      errorNote: "ขออภัย เนื้อหานี้อยู่ระหว่างปรับปรุงหรือไม่พร้อมใช้งานชั่วคราว",
    },
    comments: {
      heading: "ความคิดเห็น",
      placeholder: "ร่วมเขียนแสดงความคิดเห็นของคุณที่นี่…",
      post: "ส่งความคิดเห็น",
      posting: "กำลังส่ง…",
      signIn: "เข้าสู่ระบบ",
      signInPrompt: "เพื่อร่วมแสดงความคิดเห็น",
      noComments: "ยังไม่มีข้อคิดเห็นใดในโพสต์นี้ ร่วมเขียนแสดงความเห็นเป็นคนแรกได้เลย",
      deleteLabel: "ลบความคิดเห็น",
      charLimit: "/1000",
    },
  },
} as const;

export type Translations = (typeof t)["en"];
