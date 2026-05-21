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
    admin: {
      title: "Admin CMS",
      nav: {
        dashboard: "Dashboard",
        content: "Content",
        layouts: "Page Layouts",
        notifications: "Notifications",
        settings: "Settings",
        backToSite: "Back to site",
      },
      dashboard: {
        title: "Dashboard",
        signedInAs: (email: string) => `Signed in as ${email}`,
        quickLinks: {
          newContent: "New content",
          newContentDesc: "Create a draft for any category",
          allContent: "All content",
          allContentDesc: "Manage published and draft items",
          pageLayouts: "Page layouts",
          pageLayoutsDesc: "Edit public page sections",
          sendNotification: "Send notification",
          sendNotificationDesc: "Notify opted-in subscribers",
          settings: "Settings",
          settingsDesc: "Homepage copy and site settings",
        },
        stats: {
          total: "Total Content",
          published: "Published",
          drafts: "Drafts",
          views: "Total Views",
        },
        recentActivity: "Recent Activity",
        quickActions: "Quick Actions",
        adminProfile: "Admin Profile",
        role: "System Administrator",
      },
      contentList: {
        title: "All content",
        newButton: "New",
        noContentYet: "No content yet.",
        createFirstItem: "Create the first item",
        table: {
          title: "Title",
          type: "Type",
          status: "Status",
          stats: "Stats",
          updated: "Updated",
          viewPublicPage: "View public page",
          editPageContent: "Edit page content (blocks)",
          editMetadata: "Edit metadata",
        },
      },
      newContent: {
        title: "New content",
        subtitle: "Fill in the details below. Save as draft until you are ready to publish.",
      },
      editContent: {
        title: "Edit content",
        editPageLayout: "Edit page layout",
        backToDetails: "← Back to details",
        visualBlockEditor: "Page content · visual block editor",
        saveBlocks: "Save blocks",
        saving: "Saving…",
        saved: "Saved ✓",
      },
      layout: {
        title: "Page layouts",
        newContent: "New content",
        noContentPages: "No content pages yet.",
        createContent: "Create content",
        table: {
          page: "Page",
          type: "Type",
          status: "Status",
          updated: "Updated",
          viewPublicPage: "View public page",
          editDetails: "Edit details",
          editLayout: "Edit layout",
        },
      },
      notifications: {
        title: "Notifications",
        subtitle: "Send email updates to opted-in subscribers.",
        emailNotConfigured: "Email not configured",
        configureDesc: "Set RESEND_API_KEY and EMAIL_FROM in your .env.local to enable email notifications. Get a free API key at resend.com.",
        sendNotificationBtn: "Send notification",
        dialogTitle: "Send update notification",
        dialogSubtitle: "This will email all opted-in subscribers.",
        subjectLabel: "Subject",
        subjectPlaceholder: "New event announced…",
        previewLabel: "Preview text",
        previewPlaceholder: "Short description that appears in the email…",
        sendBtn: "Send",
        cancelBtn: "Cancel",
        sending: "Sending…",
        sentTo: (count: number) => `Sent to ${count} subscriber${count !== 1 ? "s" : ""}.`,
      },
      settings: {
        title: "Settings",
        subtitle: "Site-wide configuration.",
        socialSharing: "Social sharing",
        socialSharingDesc: "Default image and description used when pages are shared on social media or messaging apps. Individual content pages use their own cover image and excerpt when available.",
        homepageTitle: "Home page",
        homepageDesc: "Controls the featured section heading and the message shown when no content is published yet.",
        adminAccess: "Admin access",
        adminAccessDesc: "Admin access is controlled via the ADMIN_EMAILS environment variable and the admin_emails table in Supabase. To add an admin, insert their email into that table via the Supabase SQL Editor.",
        ogImageLabel: "Default OG image URL",
        ogImageDesc: "Used as the preview image when sharing any page without a cover photo.",
        ogDescLabel: "Default description",
        ogDescPlaceholder: "Shown in link previews for pages without specific content",
        featuredHeadingLabel: "Featured section heading",
        featuredHeadingPlaceholder: "Upcoming events and projects",
        emptyStateLabel: "Empty state message",
        emptyStatePlaceholder: "New content will appear here once published.",
        emptyStateDesc: "Shown on the home page when no featured content is published.",
        saving: "Saving…",
        saveBtn: "Save",
        saved: "Saved!",
        saveFailed: "Save failed.",
      },
      form: {
        category: "Category",
        title: "Title",
        titleRequired: "Title is required",
        titlePlaceholder: "Enter a clear, descriptive title",
        slug: "Slug",
        slugRequired: "Slug is required",
        slugPlaceholder: "url-friendly-slug",
        excerpt: "Excerpt",
        excerptPlaceholder: "Short summary shown on cards (max 500 chars)",
        cover: "Cover (16:9 — image or GIF)",
        dragToUpload: "Click or drag to upload cover",
        dragToUploadBlock: "Click or drag image here",
        uploading: "Uploading…",
        replaceCover: "Replace cover",
        replaceCoverBlock: "Replace image",
        removeCover: "Remove cover",
        onlyImages: "Only image files (including GIF) are accepted.",
        maxSize: "File must be under 20 MB.",
        externalUrl: "External URL",
        externalUrlPlaceholder: "https://… if content lives elsewhere",
        location: "Location",
        locationPlaceholder: "Venue or city",
        startDate: "Start date",
        endDate: "End date",
        status: "Status",
        statusDesc: "Only published content is visible to the public.",
        sortOrder: "Sort order",
        sortOrderDesc: "Lower numbers appear first.",
        saveChanges: "Save changes",
        createContent: "Create content",
        preview: "Preview",
        noCoverImage: "No cover image",
        untitled: "Untitled",
        draft: "Draft",
        published: "Published",
        archived: "Archived",
        categoryGuides: {
          event: {
            label: "Event",
            hint: "A workshop, talk, exhibition opening, or any time-bound gathering.",
            extraFields: ["Start date", "End date", "Location", "External registration URL"],
          },
          project: {
            label: "Project",
            hint: "A research project, collaborative initiative, or ongoing QAT program.",
            extraFields: ["External project URL", "Project collaborators (in body)"],
          },
          game: {
            label: "Game",
            hint: "An interactive quantum learning experience or creative digital game.",
            extraFields: ["External play URL"],
          },
          course: {
            label: "Course",
            hint: "A structured learning program. Include level, schedule, and enrollment link.",
            extraFields: ["External enrollment URL", "Start date (course begins)"],
          },
          exhibition: {
            label: "Exhibition",
            hint: "A past or upcoming exhibition, installation, or public art event.",
            extraFields: ["Start date", "End date", "Location / Venue"],
          },
          research_article: {
            label: "Research / Article",
            hint: "A paper, essay, or editorial from QAT collaborators or scientists.",
            extraFields: ["External DOI or publication URL", "Author names (in body)"],
          },
          news: {
            label: "News",
            hint: "An announcement, press release, or update about QAT or its partners.",
            extraFields: ["Related event or project (mention in body)"],
          },
          talk: {
            label: "Talk",
            hint: "A lecture, panel discussion, or conversation at the intersection of quantum science and culture.",
            extraFields: ["Speaker name(s) (in body)", "External recording URL", "Start date"],
          },
          experiment: {
            label: "Experiment",
            hint: "An interactive or conceptual experiment exploring quantum phenomena through art and design.",
            extraFields: ["External demo URL", "Tools / materials used (in body)"],
          },
          video: {
            label: "Video",
            hint: "A documentary, artistic, or educational video work produced under the QAT initiative.",
            extraFields: ["External video URL (YouTube, Vimeo, etc.)"],
          },
        },
      },
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
    admin: {
      title: "Admin CMS",
      nav: {
        dashboard: "แผงควบคุม",
        content: "เนื้อหาทั้งหมด",
        layouts: "เลย์เอาต์หน้าเพจ",
        notifications: "การแจ้งเตือน",
        settings: "การตั้งค่าระบบ",
        backToSite: "กลับสู่หน้าหลัก",
      },
      dashboard: {
        title: "แผงควบคุม",
        signedInAs: (email: string) => `เข้าสู่ระบบในชื่อ ${email}`,
        quickLinks: {
          newContent: "สร้างเนื้อหาใหม่",
          newContentDesc: "สร้างฉบับร่างเนื้อหาสำหรับหมวดหมู่ต่าง ๆ",
          allContent: "จัดการเนื้อหาทั้งหมด",
          allContentDesc: "จัดการรายการเนื้อหาที่เผยแพร่และฉบับร่าง",
          pageLayouts: "เลย์เอาต์หน้าเพจ",
          pageLayoutsDesc: "แก้ไขและจัดการส่วนแสดงผลของหน้าเพจหลัก",
          sendNotification: "ส่งข่าวสารแจ้งเตือน",
          sendNotificationDesc: "ส่งข้อความประชาสัมพันธ์หาอีเมลสมาชิก",
          settings: "การตั้งค่าทั่วไป",
          settingsDesc: "จัดการข้อมูลหน้าแรกและการตั้งค่าทั่วไปของเว็บไซต์",
        },
        stats: {
          total: "เนื้อหาทั้งหมด",
          published: "เผยแพร่แล้ว",
          drafts: "ฉบับร่าง",
          views: "จำนวนเข้าชม",
        },
        recentActivity: "ความเคลื่อนไหวล่าสุด",
        quickActions: "จัดการด่วน",
        adminProfile: "ข้อมูลผู้ดูแลระบบ",
        role: "ผู้ดูแลระบบ",
      },
      contentList: {
        title: "เนื้อหาทั้งหมด",
        newButton: "สร้างใหม่",
        noContentYet: "ยังไม่มีข้อมูลเนื้อหาเผยแพร่ในระบบ",
        createFirstItem: "เริ่มต้นสร้างเนื้อหารายการแรก",
        table: {
          title: "หัวข้อ",
          type: "ประเภท",
          status: "สถานะ",
          stats: "สถิติ",
          updated: "แก้ไขล่าสุด",
          viewPublicPage: "เปิดดูหน้าเว็บจริง",
          editPageContent: "แก้ไขเนื้อหาหน้าเพจ (บล็อก)",
          editMetadata: "แก้ไขข้อมูลพื้นฐาน",
        },
      },
      newContent: {
        title: "สร้างเนื้อหาใหม่",
        subtitle: "กรอกข้อมูลรายละเอียดของผลงานด้านล่างนี้ คุณสามารถบันทึกข้อมูลไว้เป็นฉบับร่างก่อนพร้อมที่จะเผยแพร่จริง",
      },
      editContent: {
        title: "แก้ไขข้อมูลเนื้อหา",
        editPageLayout: "แก้ไขเลย์เอาต์หน้าเพจ",
        backToDetails: "← กลับไปหน้ารายละเอียด",
        visualBlockEditor: "เนื้อหาหน้าเพจ · เครื่องมือจัดหน้าเว็บแบบบล็อก",
        saveBlocks: "บันทึกบล็อกเนื้อหา",
        saving: "กำลังบันทึก…",
        saved: "บันทึกสำเร็จ ✓",
      },
      layout: {
        title: "เลย์เอาต์หน้าเพจ",
        newContent: "สร้างเนื้อหาใหม่",
        noContentPages: "ยังไม่มีหน้าเนื้อหาเผยแพร่ในขณะนี้",
        createContent: "เริ่มต้นสร้างผลงาน",
        table: {
          page: "หน้าเพจ",
          type: "ประเภท",
          status: "สถานะ",
          updated: "แก้ไขล่าสุด",
          viewPublicPage: "เปิดดูหน้าเว็บจริง",
          editDetails: "แก้ไขข้อมูลพื้นฐาน",
          editLayout: "แก้ไขส่วนจัดหน้าเพจ",
        },
      },
      notifications: {
        title: "การส่งการแจ้งเตือน",
        subtitle: "ส่งอีเมลอัปเดตและแจ้งข่าวสารไปยังกล่องข้อความของสมาชิกที่ลงทะเบียนไว้",
        emailNotConfigured: "ยังไม่ได้ตั้งค่าระบบส่งอีเมล",
        configureDesc: "กรุณาระบุ RESEND_API_KEY และ EMAIL_FROM ในไฟล์ .env.local เพื่อเริ่มต้นใช้งานฟังก์ชันการแจ้งเตือนทางอีเมล รับคีย์ API ฟรีได้ที่ resend.com",
        sendNotificationBtn: "ส่งข้อความแจ้งเตือน",
        dialogTitle: "ส่งอีเมลข่าวสารแก่สมาชิก",
        dialogSubtitle: "ข้อความนี้จะถูกส่งทางอีเมลไปยังสมาชิกที่กดเปิดรับข่าวสารประชาสัมพันธ์ทุกคน",
        subjectLabel: "หัวข้ออีเมล (Subject)",
        subjectPlaceholder: "ประกาศกิจกรรมและนิทรรศการใหม่ล่าสุดจากทาง QAT…",
        previewLabel: "คำโปรยตัวอย่างข้อความสั้น (Preview Text)",
        previewPlaceholder: "คำอธิบายสั้น ๆ ที่จะแสดงก่อนกดเปิดอ่านอีเมล…",
        sendBtn: "ส่งข้อความ",
        cancelBtn: "ยกเลิก",
        sending: "กำลังส่งข้อความ…",
        sentTo: (count: number) => `ส่งอีเมลสำเร็จไปยังผู้รับจำนวน ${count} คน`,
      },
      settings: {
        title: "การตั้งค่าระบบ",
        subtitle: "ตั้งค่าและปรับแต่งการแสดงผลทั่วไปของหน้าเว็บไซต์",
        socialSharing: "การแชร์ลงโซเชียลมีเดีย",
        socialSharingDesc: "กำหนดรูปภาพและข้อความอธิบายเริ่มต้นสำหรับการแชร์หน้าลิงก์เว็บไซต์นี้บนสื่อสังคมออนไลน์หรือแอปแชทต่าง ๆ (สำหรับหน้าเนื้อหารายการหลัก ระบบจะดึงภาพหน้าปกและคำย่อเฉพาะของหน้าเพจนั้น ๆ มาใช้โดยอัตนยัติ)",
        homepageTitle: "หน้าแรกของเว็บไซต์",
        homepageDesc: "ใช้กำหนดหัวข้อในส่วนการแสดงผลผลงานเด่น และข้อความทักทายเมื่อระบบยังไม่มีรายการเผยแพร่ใด ๆ",
        adminAccess: "การกำหนดสิทธิ์ผู้ดูแลระบบ",
        adminAccessDesc: "การเข้าถึงระบบควบคุมหลังบ้าน (Admin Access) จะอ้างอิงจากตัวแปรสภาพแวดล้อม ADMIN_EMAILS และรายชื่อในตาราง admin_emails ของ Supabase โดยท่านสามารถเพิ่มอีเมลผู้ดูแลระบบรายใหม่ผ่านการรันคำสั่ง SQL ใน Supabase SQL Editor",
        ogImageLabel: "ลิงก์รูปภาพแสดงตัวอย่างเริ่มต้น (Default OG Image URL)",
        ogImageDesc: "รูปภาพตัวอย่างที่จะนำไปแสดงเมื่อหน้าเพจที่แชร์ไม่มีรูปหน้าปกเฉพาะตัว",
        ogDescLabel: "ข้อความอธิบายเริ่มต้น",
        ogDescPlaceholder: "ข้อความอธิบายสั้น ๆ ที่จะแสดงใต้ลิงก์เมื่อมีการแชร์ข้อมูลทั่วไปของเว็บไซต์",
        featuredHeadingLabel: "หัวข้อส่วนรายการผลงานแนะนำ",
        featuredHeadingPlaceholder: "ผลงานและกิจกรรมเด่นล่าสุดที่กำลังมาถึง",
        emptyStateLabel: "ข้อความเมื่อไม่มีเนื้อหาแสดงผล",
        emptyStatePlaceholder: "ผลงานประชาสัมพันธ์รายการใหม่จะปรากฏให้คุณเข้าชมที่นี่เร็ว ๆ นี้",
        emptyStateDesc: "ข้อความแสดงผลบนหน้าแรกเมื่อยังไม่มีข้อมูลผลงานแนะนำถูกเผยแพร่เข้าระบบ",
        saving: "กำลังบันทึกข้อมูล…",
        saveBtn: "บันทึกตั้งค่า",
        saved: "บันทึกการตั้งค่าสำเร็จ!",
        saveFailed: "บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
      },
      form: {
        category: "Category",
        title: "ชื่อหัวข้อเรื่อง",
        titleRequired: "กรุณาระบุชื่อหัวข้อเรื่อง",
        titlePlaceholder: "ระบุชื่อหัวข้อที่ชัดเจน เข้าใจง่าย และดึงดูดความสนใจ",
        slug: "สลักลิงก์ (Slug)",
        slugRequired: "กรุณาระบุข้อความสลักลิงก์",
        slugPlaceholder: "url-friendly-slug-ภาษาอังกฤษและขีดกลาง",
        excerpt: "คำโปรยสั้น (Excerpt)",
        excerptPlaceholder: "เขียนสรุปเนื้อความสั้น ๆ ที่จะปรากฏบนการ์ดแสดงผล (ไม่เกิน 500 ตัวอักษร)",
        cover: "รูปภาพหน้าปก (อัตราส่วน 16:9 — ภาพนิ่งหรือภาพเคลื่อนไหว GIF)",
        dragToUpload: "คลิกเพื่อเลือกไฟล์ หรือลากรูปภาพมาวางที่นี่เพื่ออัปโหลด",
        dragToUploadBlock: "คลิกหรือลากไฟล์รูปภาพมาวางตรงนี้",
        uploading: "กำลังอัปโหลดไฟล์ภาพ…",
        replaceCover: "เปลี่ยนรูปหน้าปกใหม่",
        replaceCoverBlock: "เปลี่ยนไฟล์รูปภาพ",
        removeCover: "ลบรูปหน้าปกนี้ออก",
        onlyImages: "รองรับเฉพาะไฟล์รูปภาพ (รวมถึงไฟล์ GIF) เท่านั้น",
        maxSize: "ขนาดไฟล์ต้องมีขนาดน้อยกว่า 20 MB",
        externalUrl: "ลิงก์เว็บไซต์ภายนอก (External URL)",
        externalUrlPlaceholder: "ระบุลิงก์นำไปสู่ข้อมูลจริง หากเนื้อหานี้อยู่บนเว็บไซต์อื่น (เช่น https://…)",
        location: "สถานที่จัดงาน / แหล่งจัดแสดง",
        locationPlaceholder: "ระบุสถานที่จัดงาน เมือง หรือแพลตฟอร์มปลายทาง",
        startDate: "วันที่เริ่มต้น",
        endDate: "วันที่สิ้นสุด",
        status: "สถานะรายการ",
        statusDesc: "เฉพาะเนื้อหาที่มีสถานะเป็น 'เผยแพร่แล้ว' เท่านั้นที่จะแสดงผลบนหน้าเว็บหลักสู่สาธารณะ",
        sortOrder: "ลำดับการแสดงผล (Sort Order)",
        sortOrderDesc: "ตัวเลขค่าน้อยจะแสดงขึ้นก่อนผลงานอื่น ๆ เสมอ",
        saveChanges: "บันทึกข้อมูลผลงาน",
        createContent: "สร้างผลงานใหม่",
        preview: "ตัวอย่างหน้าการ์ดแสดงผล",
        noCoverImage: "ไม่มีรูปภาพหน้าปกประกอบ",
        untitled: "ไม่ได้ระบุหัวข้อ",
        draft: "ฉบับร่าง",
        published: "เผยแพร่แล้ว",
        archived: "เก็บถาวร",
        categoryGuides: {
          event: {
            label: "Event",
            hint: "การจัดสัมมนาเชิงปฏิบัติการ (Workshop), งานเสวนาสัมมนา, พิธีเปิดแสดงนิทรรศการ หรือการนัดหมายที่มีการกำหนดเวลาจัดกิจกรรมที่ชัดเจน",
            extraFields: ["วันที่เริ่มต้นจัดกิจกรรม", "วันที่สิ้นสุดจัดกิจกรรม", "สถานที่ตั้งจัดงาน", "ลิงก์สำหรับเปิดลงทะเบียนเข้างาน"],
          },
          project: {
            label: "Project",
            hint: "ผลงานวิจัย, โครงการวิจัยร่วมเชิงลึก หรือแนวคิดโครงการหลักที่จัดทำขึ้นภายใต้สมาคม QAT",
            extraFields: ["ลิงก์นำไปสู่โครงการจริงภายนอก", "ข้อมูลรายชื่อผู้ร่วมโครงการ (ระบุเพิ่มเติมในเนื้อหาหลัก)"],
          },
          game: {
            label: "Game",
            hint: "เกมการเรียนรู้เชิงปฏิสัมพันธ์ หรือเกมทดลองสร้างสรรค์ด้านวิทยาศาสตร์ควอนตัม",
            extraFields: ["ลิงก์สำหรับเข้าเล่นเกมทดลองออนไลน์"],
          },
          course: {
            label: "Course",
            hint: "หลักสูตรและกระบวนการเรียนรู้ ระบุระดับของผู้เรียน ตารางเวลาเรียน และลิงก์สำหรับสมัครเข้าศึกษา",
            extraFields: ["ลิงก์สำหรับลงทะเบียนเข้าเรียน", "วันที่กำหนดเริ่มเปิดการเรียนการสอนจริง"],
          },
          exhibition: {
            label: "Exhibition",
            hint: "นิทรรศการศิลปะ สื่อปฏิสัมพันธ์ หรือศิลปะการจัดวางที่กำลังจัดแสดงหรือจัดมาแล้วในอดีต",
            extraFields: ["วันที่เริ่มต้นนิทรรศการ", "วันที่สิ้นสุดนิทรรศการ", "สถานที่จัดแสดงงาน / แกลเลอรี่"],
          },
          research_article: {
            label: "Research / Article",
            hint: "บทความวิจัย เรียงความทางความคิดเชิงลึก หรือข้อมูลวารสารที่เขียนร่วมโดยสมาชิกสมาคม QAT และนักวิทยาศาสตร์",
            extraFields: ["ลิงก์ DOI อ้างอิง หรือลิงก์สำนักพิมพ์วารสารวิชาการ", "รายชื่อคณะผู้ทำวิจัย (ระบุในเนื้อความด้านใน)"],
          },
          news: {
            label: "News",
            hint: "ประกาศประชาสัมพันธ์ข่าวสาร, ข่าวประชาสัมพันธ์สื่อสาร หรือความเคลื่อนไหวทั่วไปของสมาคมและภาคีเครือข่าย",
            extraFields: ["ข้อมูลกิจกรรมหรือโครงการสร้างสรรค์ที่อ้างอิงถึง"],
          },
          talk: {
            label: "Talk",
            hint: "คลิปบันทึกเสวนา การบรรยายทางวิชาการ หรือเวทีอภิปรายแลกเปลี่ยนด้านวิทยาศาสตร์ควอนตัมและวัฒนธรรม",
            extraFields: ["รายชื่อวิทยากรผู้บรรยาย (ระบุในเนื้อความด้านใน)", "ลิงก์เทปบันทึกงานเสวนา", "กำหนดวันจัดงานเสวนา"],
          },
          experiment: {
            label: "Experiment",
            hint: "ชิ้นงานต้นแบบนวัตกรรม หรือการทดลองเชิงปฏิสัมพันธ์เพื่อสื่อสารปรากฏการณ์ฟิสิกส์ผ่านศิลปะและการออกแบบ",
            extraFields: ["ลิงก์เข้าชมผลงานทดลองสาธิตจำลอง", "วัสดุอุปกรณ์หรือซอฟต์แวร์ที่ใช้พัฒนา (ระบุในเนื้อหาด้านใน)"],
          },
          video: {
            label: "Video",
            hint: "ภาพยนตร์สารคดีสั้นสร้างสรรค์ วิดีโอบันทึกกิจกรรมนิทรรศการ หรือบันทึกเพื่อการศึกษาของ QAT",
            extraFields: ["ลิงก์วิดีโอแชร์จากแพลตฟอร์ม (YouTube, Vimeo ฯลฯ)"],
          },
        },
      },
    },
  },
} as const;

export type Translations = (typeof t)["en"];
