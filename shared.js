  // التحقق من وقت المسابقة
  function isQuizTime() {
      const now = new Date();
      const hour = now.getHours();
      // المسابقة متاحة من الساعة 7 مساءً حتى 8 مساءً
      return hour >= 19 && hour < 20;
  }

  // الحصول على الوقت المتبقي حتى المسابقة التالية
  function getNextQuizTime() {
      const now = new Date();
      const hour = now.getHours();
      
      if (hour < 19) {
          // قبل بداية المسابقة
          const hoursLeft = 19 - hour;
          return `${hoursLeft} ساعات`;
      } else if (hour >= 20) {
          // بعد انتهاء المسابقة
          const hoursLeft = 24 - hour + 19;
          return `${hoursLeft} ساعات`;
      }
      return "المسابقة متاحة الآن";
  }

  // التحقق من إمكانية عرض المتصدرين
  function getLeaderboardStatus() {
      const now = new Date();
      const hour = now.getHours();
      const canView = hour >= 20; // يمكن عرض النتائج بعد الساعة 8 مساءً

      if (canView) {
          return {
              canView: true,
              message: "نتائج اليوم",
              subMessage: "مبروك لجميع المشاركين!",
              timeMessage: "النتائج متاحة الآن"
          };
      }

      // حساب الوقت المتبقي للنتائج
      let timeMessage;
      if (hour < 19) {
          timeMessage = "المسابقة تبدأ الساعة 7 مساءً";
      } else if (hour >= 19 && hour < 20) {
          timeMessage = "المسابقة جارية الآن";
      } else {
          timeMessage = getTimeUntilLeaderboard().formatted;
      }

      return {
          canView: false,
          message: "النتائج غير متاحة حالياً",
          subMessage: "يمكنك مشاهدة النتائج بعد الساعة 8 مساءً",
          timeMessage: timeMessage
      };
  }

  // حساب الوقت المتبقي حتى عرض النتائج
  function getTimeUntilLeaderboard() {
      const now = new Date();
      const target = new Date();
      target.setHours(20, 0, 0, 0); // 8 PM

      if (now >= target) {
          target.setDate(target.getDate() + 1);
      }

      const diff = target - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return {
          diff: diff,
          formatted: `${hours} ساعات و ${minutes} دقيقة و ${seconds} ثانية`
      };
  }

  // عرض رسالة حالة المسابقة
  function getQuizStatusMessage() {
      const now = new Date();
      const hour = now.getHours();
      
      if (hour < 19) {
          const timeUntil = getTimeUntilQuiz();
          return `المسابقة ستبدأ في تمام الساعة 7 مساءً (بعد ${timeUntil})`;
      } else if (hour >= 19 && hour < 20) {
          return "المسابقة متاحة الآن! شارك معنا";
      } else {
          return "انتهت مسابقة اليوم، انتظرونا غداً في تمام الساعة 7 مساءً";
      }
  }

  // حساب الوقت المتبقي حتى بداية المسابقة
  function getTimeUntilQuiz() {
      const now = new Date();
      const target = new Date();
      target.setHours(19, 0, 0, 0); // 7 PM

      if (now >= target) {
          target.setDate(target.getDate() + 1);
      }

      const diff = target - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return `${hours} ساعات و ${minutes} دقيقة و ${seconds} ثانية`;
  }

  // باقي الدوال تبقى كما هي...
  // (validatePlayerName, updateCurrentDate, savePlayerScore, etc.)
