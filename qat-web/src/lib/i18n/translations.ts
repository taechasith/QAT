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
      atlas: "แผนที่",
      game: "เกม",
      course: "คอร์ส",
      exhibition: "นิทรรศการ",
      research: "วิจัย",
      news: "ข่าว",
      talk: "บรรยาย",
      experiment: "ทดลอง",
      video: "วิดีโอ",
      login: "เข้าสู่ระบบ",
      myAccount: "บัญชีของฉัน",
      signOut: "ออกจากระบบ",
    },
    footer: {
      tagline:
        "เชื่อมโยงวิทยาศาสตร์ควอนตัม ศิลปะ การศึกษา และจินตนาการสาธารณะทั่วประเทศไทยและทั่วโลก",
      copyright: (year: number) => `© ${year} QAT Assoc. · CreativeLabTH Group`,
    },
    splash: {
      initializing: "กำลังเริ่มต้นระบบควอนตัม",
      ready: "ระบบพร้อมแล้ว",
      interfaceReady: "เชื่อมต่ออินเทอร์เฟซสำเร็จ",
      preparing: "กำลังเตรียมระบบ",
    },
    auth: {
      login: {
        eyebrow: "เข้าสู่ระบบ",
        heading: "ยินดีต้อนรับกลับ",
        email: "อีเมล",
        emailPlaceholder: "you@example.com",
        password: "รหัสผ่าน",
        forgotPassword: "ลืมรหัสผ่าน?",
        signingIn: "กำลังเข้าสู่ระบบ…",
        signIn: "เข้าสู่ระบบ",
        noAccount: "ยังไม่มีบัญชี?",
        createOne: "สร้างบัญชี",
        accountCreated: "สร้างบัญชีแล้ว — เข้าสู่ระบบเพื่อดำเนินการต่อ",
        tooManyAttempts: "พยายามเข้าสู่ระบบมากเกินไป",
        tooManyAttemptsDesc: "รีเซ็ตรหัสผ่านเพื่อเข้าถึงบัญชีของคุณ",
        resetPassword: "รีเซ็ตรหัสผ่าน",
        tryAgain: "ลองอีกครั้ง",
        havingTrouble: "มีปัญหา?",
        resetYourPassword: "รีเซ็ตรหัสผ่าน",
        incorrectCredentials: (n: number) =>
          `อีเมลหรือรหัสผ่านไม่ถูกต้อง เหลืออีก ${n} ครั้ง`,
        emailNotConfirmed:
          "ยังไม่ได้ยืนยันอีเมล โปรดตรวจสอบกล่องจดหมายหรือติดต่อผู้ดูแลระบบ",
      },
      register: {
        eyebrow: "เข้าร่วม QAT",
        heading: "สร้างบัญชี",
        email: "อีเมล",
        emailPlaceholder: "you@example.com",
        password: "รหัสผ่าน",
        passwordPlaceholder: "อย่างน้อย 8 ตัวอักษร",
        confirmPassword: "ยืนยันรหัสผ่าน",
        confirmPlaceholder: "พิมพ์รหัสผ่านอีกครั้ง",
        creating: "กำลังสร้าง…",
        createAccount: "สร้างบัญชี",
        alreadyHaveAccount: "มีบัญชีอยู่แล้ว?",
        signIn: "เข้าสู่ระบบ",
        passwordsMismatch: "รหัสผ่านไม่ตรงกัน",
        passwordTooShort: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร",
        alreadyExists: "มีบัญชีที่ใช้อีเมลนี้แล้ว กรุณาเข้าสู่ระบบแทน",
        invalidEmail: "กรุณากรอกอีเมลที่ถูกต้อง",
      },
      forgotPassword: {
        eyebrow: "รีเซ็ตรหัสผ่าน",
        heading: "ลืมรหัสผ่าน?",
        description: "กรอกอีเมลและเราจะส่งลิงก์รีเซ็ตที่ปลอดภัย",
        email: "อีเมล",
        emailPlaceholder: "you@example.com",
        sending: "กำลังส่ง…",
        sendResetLink: "ส่งลิงก์รีเซ็ต",
        backToSignIn: "กลับไปเข้าสู่ระบบ",
        checkInbox: "ตรวจสอบกล่องจดหมาย",
        resetLinkSent: "ส่งลิงก์รีเซ็ตแล้ว",
        sentMessage: (email: string) =>
          `ส่งลิงก์รีเซ็ตรหัสผ่านไปยัง ${email} แล้ว คลิกลิงก์ในอีเมลนั้นเพื่อตั้งรหัสผ่านใหม่`,
        spamNote:
          "ไม่ได้รับ? ตรวจสอบโฟลเดอร์สแปมหรือลองอีกครั้ง",
        sendAgain: "ส่งอีกครั้ง",
      },
    },
    card: {
      readMore: "อ่านเพิ่มเติม",
    },
    contentDetail: {
      noContent: "ทีม QAT จะเพิ่มรายละเอียดเร็ว ๆ นี้",
      openLink: "เปิดลิงก์ที่เกี่ยวข้อง",
      member: "สมาชิก",
    },
    account: {
      eyebrow: "โปรไฟล์ของคุณ",
      unnamedExplorer: "นักสำรวจไร้นาม",
      settings: "การตั้งค่า",
      emailUpdates: "อัปเดตทางอีเมล",
      emailUpdatesDesc: "รับข่าวสารและการแจ้งเตือนกิจกรรมที่กำลังจะมาถึง",
      password: "รหัสผ่าน",
      passwordDesc: "ขอลิงก์รีเซ็ตไปยังอีเมลของคุณ",
      changePassword: "เปลี่ยนรหัสผ่าน",
      avatar: "รูปโปรไฟล์",
      achievements: "ความสำเร็จ",
    },
    profileName: {
      displayName: "ชื่อที่แสดง",
      placeholder: "ชื่อของคุณ",
      saving: "กำลังบันทึก…",
      save: "บันทึก",
      saved: "บันทึกแล้ว!",
      failed: "บันทึกไม่สำเร็จ ลองอีกครั้ง",
    },
    notifications: {
      toggle: "รับอีเมลอัปเดตเกี่ยวกับกิจกรรมและข่าวสาร QAT",
      failed: "อัปเดตไม่สำเร็จ กรุณาลองอีกครั้ง",
      enabled: "คุณจะได้รับอีเมลอัปเดต",
      disabled: "ปิดการรับอีเมลอัปเดตแล้ว",
    },
    hero: {
      eyebrow: "CreativeLabTH Group International Initiative",
      title: "Quantum Art Thailand Association",
      description:
        "แพลตฟอร์มสาธารณะที่เชื่อมโยงวิทยาศาสตร์ควอนตัม ศิลปะ การปฏิสัมพันธ์ และวัฒนธรรมอนาคต — ที่ซึ่งแนวคิดที่ยากที่สุดกลายเป็นสิ่งที่มนุษย์เข้าใจได้",
      discoverMission: "ค้นพบพันธกิจ",
      exploreDestinations: "สำรวจเส้นทาง",
      scrollHint: "เลื่อนเพื่อสำรวจ",
    },
    mission: {
      eyebrow: "สิ่งที่เราทำ",
      heading: "จุดที่วิทยาศาสตร์ควอนตัมพบกับจินตนาการของมนุษย์",
      mission1Eyebrow: "พันธกิจที่ 1",
      mission1Title: "ทำให้วิทยาศาสตร์ยากเป็นเรื่องสาธารณะ",
      mission1p1:
        "วิทยาศาสตร์ควอนตัมอยู่ที่ขอบของสิ่งที่เราจินตนาการได้ — แต่ไม่จำเป็นต้องซ่อนอยู่เบื้องหลังภาษาวิชาการ QAT ใช้การเล่าเรื่องด้วยภาพ การออกแบบปฏิสัมพันธ์ และการปฏิบัติทางศิลปะเพื่อนำแนวคิดควอนตัมเข้าใกล้นักเรียน นักสร้างสรรค์ และผู้ที่อยากรู้อยากเห็นทั่วทุกมุมโลก",
      mission1p2:
        "เราเชื่อว่าวิทยาศาสตร์กลายเป็นวัฒนธรรมเมื่อทำให้เข้าถึงได้ เมื่อคนสามารถมองเห็น รู้สึก หรือเล่นกับแนวคิดหนึ่ง มันจะหยุดความเป็นนามธรรมและเริ่มกลายเป็นความจริง",
      mission2Eyebrow: "พันธกิจที่ 2",
      mission2Title: "ศิลปะในฐานะเครื่องมือทางวิทยาศาสตร์",
      mission2p1:
        "ศิลปะและวิทยาศาสตร์ไม่ใช่สิ่งตรงข้ามกัน ศิลปินถามคำถามที่นักวิทยาศาสตร์ยังไม่ได้เขียนลงไป ที่ QAT เราเชิญศิลปิน นักออกแบบ และนักเทคโนโลยีสร้างสรรค์มาทำงานร่วมกับนักวิจัย — ไม่ใช่เพื่อแสดงภาพวิทยาศาสตร์ แต่เพื่อช่วยจินตนาการถึงมันในรูปแบบที่แตกต่าง",
      mission2p2:
        "การทดลองทางศิลปะกลายเป็นวิธีทดสอบสมมติฐาน กำหนดกรอบปัญหาใหม่ และเปิดทางเดินใหม่แห่งจินตนาการในโลกควอนตัม",
    },
    portal: {
      eyebrow: "เก้าจุดหมาย",
      heading: "คุณอยากไปที่ไหน?",
      whatsHappening: "กำลังเกิดอะไรขึ้น",
      visit: "เยี่ยมชม",
      explore: "สำรวจ",
      destinations: [
        {
          title: "Atlas",
          description:
            "สำรวจแผนที่ความรู้ควอนตัมเชิงโต้ตอบ — โครงการสร้างสรรค์ภายนอกโดย CreativeLabTH Group",
          badge: "ภายนอก",
        },
        {
          title: "เกม",
          description:
            "ประสบการณ์การเรียนรู้ควอนตัมเชิงโต้ตอบและการทดลองสร้างสรรค์",
        },
        {
          title: "คอร์ส",
          description:
            "คอร์สวิทยาศาสตร์ควอนตัมและเทคโนโลยีสร้างสรรค์สำหรับทุกระดับ",
        },
        {
          title: "นิทรรศการ",
          description:
            "คลังนิทรรศการ QAT ในอดีต การติดตั้ง และงานศิลปะ",
        },
        {
          title: "วิจัยและบทความ",
          description:
            "บทความวิชาการ เรียงความ และบันทึกการวิจัยจากผู้ร่วมมือ QAT",
        },
        {
          title: "ข่าว",
          description:
            "อัปเดต ประกาศ และเรื่องราวล่าสุดจาก Quantum Art Thailand",
        },
        {
          title: "บรรยาย",
          description:
            "การบรรยาย การอภิปราย และบทสนทนาที่จุดตัดของวิทยาศาสตร์ควอนตัมและวัฒนธรรม",
        },
        {
          title: "ทดลอง",
          description:
            "การทดลองเชิงโต้ตอบและเชิงแนวคิดที่สำรวจปรากฏการณ์ควอนตัมผ่านศิลปะและการออกแบบ",
        },
        {
          title: "วิดีโอ",
          description:
            "ผลงานวิดีโอสารคดี ศิลปะ และการศึกษาที่ผลิตภายใต้โครงการ QAT",
        },
      ],
    },
    pages: {
      game: {
        eyebrow: "สนามเล่น",
        title: "เกม",
        description:
          "ประสบการณ์ควอนตัมเชิงโต้ตอบ — เกมจำลองอนุภาค ปริศนา และเกมแนวคิดที่ทำให้สิ่งล่องหนจับต้องได้",
        emptyTitle: "ยังไม่มีเกม",
        emptyDescription:
          "เกมและผลงานเชิงโต้ตอบจะปรากฏที่นี่เมื่อเผยแพร่แล้ว",
      },
      course: {
        eyebrow: "ห้องเรียน",
        title: "คอร์ส",
        description:
          "โปรแกรมที่เชื่อมโยงวิทยาศาสตร์ควอนตัมกับการปฏิบัติเชิงสร้างสรรค์ — เวิร์กชอป คอร์ส และการสำรวจแบบมีคำแนะนำ",
        emptyTitle: "ยังไม่มีคอร์ส",
        emptyDescription:
          "คอร์สและเวิร์กชอปจะปรากฏที่นี่เมื่อเผยแพร่แล้ว โปรแกรมใหม่กำลังพัฒนา",
      },
      exhibition: {
        eyebrow: "แกลเลอรี",
        title: "นิทรรศการ",
        description:
          "นิทรรศการคิวเรทและดิจิทัลที่สำรวจจุดตัดระหว่างฟิสิกส์และประสบการณ์ทางวัฒนธรรม",
        emptyTitle: "ยังไม่มีนิทรรศการ",
        emptyDescription:
          "ข้อมูลนิทรรศการและการแสดงที่กำลังจะมาถึงจะถูกลงรายการที่นี่เมื่อเปิดแล้ว",
      },
      research: {
        eyebrow: "บันทึกห้องปฏิบัติการ",
        title: "วิจัย",
        description:
          "ผลการวิจัย การสำรวจเชิงทฤษฎี และบันทึกภาคสนามจากกลุ่ม QAT ที่เชื่อมวิทยาศาสตร์กับการปฏิบัติเชิงสร้างสรรค์",
        emptyTitle: "ยังไม่มีบทความ",
        emptyDescription:
          "บทความวิจัยและเอกสารทางวิชาการจะปรากฏที่นี่เมื่อเผยแพร่แล้ว",
      },
      news: {
        eyebrow: "ข่าวสาร",
        title: "ข่าว",
        description:
          "อัปเดตจากแนวหน้าศิลปะควอนตัม — กิจกรรม ความร่วมมือ ทุน และประกาศจากสมาคม QAT",
        emptyTitle: "ยังไม่มีข่าว",
        emptyDescription: "ประกาศและอัปเดตจะปรากฏที่นี่เมื่อเผยแพร่แล้ว",
      },
      talk: {
        eyebrow: "ชุดการบรรยาย",
        title: "บรรยาย",
        description:
          "การบรรยายที่บันทึกไว้ การอภิปรายคณะผู้เชี่ยวชาญ และบทสนทนาสาธารณะที่จุดตัดของวิทยาศาสตร์ควอนตัมและวัฒนธรรม",
        emptyTitle: "ยังไม่มีการบรรยาย",
        emptyDescription:
          "วิดีโอการบรรยายและบทถอดความจะปรากฏที่นี่เมื่อเผยแพร่แล้ว",
      },
      experiment: {
        eyebrow: "งานภาคสนาม",
        title: "ทดลอง",
        description:
          "การทดลองสด ต้นแบบ และงานระหว่างดำเนินการ — การวิจัยเปิดจากการสืบสวนเชิงสร้างสรรค์อย่างต่อเนื่องของ QAT",
        emptyTitle: "ยังไม่มีการทดลอง",
        emptyDescription:
          "ผลงานทดลองและต้นแบบจะถูกแบ่งปันที่นี่เมื่อพัฒนาแล้ว",
      },
      video: {
        eyebrow: "คลังวิดีโอ",
        title: "วิดีโอ",
        description:
          "วิดีโอบันทึกนิทรรศการ การแสดง และโปรแกรมการศึกษาที่ผลิตภายใต้โครงการ QAT",
        emptyTitle: "ยังไม่มีวิดีโอ",
        emptyDescription:
          "วิดีโอบันทึกและภาพยนตร์สั้นจะปรากฏที่นี่เมื่อเผยแพร่แล้ว",
      },
    },
    engagement: {
      unlike: "เลิกถูกใจ",
      like: "ถูกใจ",
      signInToLike: "เข้าสู่ระบบเพื่อถูกใจ",
    },
    empty: {
      note: "กลับมาตรวจสอบเร็ว ๆ นี้",
      errorNote: "เนื้อหาไม่พร้อมใช้งานชั่วคราว",
    },
    comments: {
      heading: "ความคิดเห็น",
      placeholder: "เพิ่มความคิดเห็น…",
      post: "โพสต์",
      posting: "กำลังโพสต์…",
      signIn: "เข้าสู่ระบบ",
      signInPrompt: "เพื่อแสดงความคิดเห็น",
      noComments: "ยังไม่มีความคิดเห็น เป็นคนแรก",
      deleteLabel: "ลบความคิดเห็น",
      charLimit: "/1000",
    },
  },
} as const;

export type Translations = (typeof t)["en"];
