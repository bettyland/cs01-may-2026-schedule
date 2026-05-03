import { useRef, useCallback } from "react";
import { motion } from "motion/react";
import { BookOpen, Calendar, ChevronRight, Music, Users, Download, FileText } from "lucide-react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

interface DaySchedule {
  date: string;
  day: string;
  verse: string;
  isToday?: boolean;
}

interface WeekSchedule {
  range: string;
  intensive: string;
  days: DaySchedule[];
}

const SCHEDULE_DATA: WeekSchedule[] = [
  {
    range: "5/1 – 5/3",
    intensive: "接续 4 月最后一周的内容",
    days: [
      { date: "5/1", day: "周五", verse: "西 3:17-19" },
      { date: "5/2", day: "周六", verse: "西 3:18-20" },
      { date: "5/3", day: "周日", verse: "无安排" },
    ],
  },
  {
    range: "5/4 – 5/10",
    intensive: "【书】《事奉的炸力》第五篇-传道人和见证人，第六章-使命；【音视频】《基督是分开的么》第十一堂",
    days: [
      { date: "5/4", day: "周一", verse: "西 3:19-21" },
      { date: "5/5", day: "周二", verse: "西 3:20-22" },
      { date: "5/6", day: "周三", verse: "西 3:21-23" },
      { date: "5/7", day: "周四", verse: "西 3:22-24" },
      { date: "5/8", day: "周五", verse: "西 3:23-25" },
      { date: "5/9", day: "周六", verse: "西 3:1-5" },
      { date: "5/10", day: "周日", verse: "无安排" },
    ],
  },
  {
    range: "5/11 – 5/17",
    intensive: "【书】《事奉的炸力》第七章-需要的感觉，第八章-罪的感觉；【音视频】《基督是分开的么》第十二堂",
    days: [
      { date: "5/11", day: "周一", verse: "西 3:6-10" },
      { date: "5/12", day: "周二", verse: "西 3:11-15" },
      { date: "5/13", day: "周三", verse: "西 3:16-20" },
      { date: "5/14", day: "周四", verse: "西 3:21-25" },
      { date: "5/15", day: "周五", verse: "西 4:1-3" },
      { date: "5/16", day: "周六", verse: "西 4:2-4" },
      { date: "5/17", day: "周日", verse: "无安排" },
    ],
  },
  {
    range: "5/18 – 5/24",
    intensive: "【书】《事奉的炸力》第九章-最基本的真理，第十章-怎样行才能得救；【音视频】《基督是分开的么》第十三堂",
    days: [
      { date: "5/18", day: "周一", verse: "西 4:3-5" },
      { date: "5/19", day: "周二", verse: "西 4:4-6" },
      { date: "5/20", day: "周三", verse: "西 4:5-7" },
      { date: "5/21", day: "周四", verse: "西 4:6-8" },
      { date: "5/22", day: "周五", verse: "西 4:7-9" },
      { date: "5/23", day: "周六", verse: "西 4:8-10" },
      { date: "5/24", day: "周日", verse: "无安排" },
    ],
  },
  {
    range: "5/25 – 5/31",
    intensive: "小组交通及合组交通",
    days: [
      { date: "5/25", day: "周一", verse: "西 4:9-11" },
      { date: "5/26", day: "周二", verse: "西 4:10-12" },
      { date: "5/27", day: "周三", verse: "西 4:11-13" },
      { date: "5/28", day: "周四", verse: "西 4:12-14" },
      { date: "5/29", day: "周五", verse: "西 4:13-15" },
      { date: "5/30", day: "周六", verse: "西 4:14-16" },
      { date: "5/31", day: "周日", verse: "无安排" },
    ],
  },
];

export default function App() {
  // Hardcoded current date context for the demo
  const currentDate = "5/3";
  const exportRef = useRef<HTMLDivElement>(null);

  const downloadPng = useCallback(async () => {
    if (exportRef.current === null) return;
    
    try {
      // Calculate height based on 1600px width to maintain aspect ratio
      const originalWidth = exportRef.current.offsetWidth;
      const originalHeight = exportRef.current.offsetHeight;
      const ratio = originalHeight / originalWidth;
      const targetWidth = 1600;
      const targetHeight = targetWidth * ratio;

      const dataUrl = await toPng(exportRef.current, {
        cacheBust: true,
        width: targetWidth,
        height: targetHeight,
        style: {
          width: `${targetWidth}px`,
          height: `${targetHeight}px`,
          transform: `scale(${targetWidth / originalWidth})`,
          transformOrigin: 'top left',
          backgroundColor: '#fff',
        }
      });
      
      const link = document.createElement('a');
      link.download = 'CS01-2026年5月进度表.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image', err);
    }
  }, []);

  const downloadPdf = useCallback(async () => {
    if (exportRef.current === null) return;
    
    try {
      const originalWidth = exportRef.current.offsetWidth;
      const originalHeight = exportRef.current.offsetHeight;
      const ratio = originalHeight / originalWidth;
      const targetWidth = 1600;
      const targetHeight = targetWidth * ratio;

      const dataUrl = await toPng(exportRef.current, {
        cacheBust: true,
        width: targetWidth,
        height: targetHeight,
        style: {
          width: `${targetWidth}px`,
          height: `${targetHeight}px`,
          transform: `scale(${targetWidth / originalWidth})`,
          transformOrigin: 'top left',
          backgroundColor: '#fff',
        }
      });

      const pdf = new jsPDF({
        orientation: targetHeight > targetWidth ? 'p' : 'l',
        unit: 'px',
        format: [targetWidth, targetHeight]
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, targetWidth, targetHeight);
      pdf.save('CS01-2026年5月进度表.pdf');
    } catch (err) {
      console.error('Failed to export PDF', err);
    }
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans p-4 md:p-8">
      {/* Action Buttons */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={downloadPng}
          className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white rounded-full text-sm font-medium hover:bg-neutral-800 transition-all shadow-sm hover:shadow-md active:scale-95"
        >
          <Download size={16} />
          下载 PNG 图片
        </button>
        <button
          onClick={downloadPdf}
          className="flex items-center gap-2 px-5 py-2.5 bg-white text-neutral-900 border border-neutral-200 rounded-full text-sm font-medium hover:bg-neutral-50 transition-all shadow-sm hover:shadow-md active:scale-95"
        >
          <FileText size={16} />
          下载 PDF
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-sm border border-neutral-100 rounded-3xl overflow-hidden" ref={exportRef}>
        <div className="p-8 md:p-12">
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase bg-neutral-900 text-white rounded-full">
              May 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4 text-neutral-800">
              CS01 5月进度表
            </h1>
            <p className="text-neutral-500 max-w-lg mx-auto">
              每日灵修 · 每日读经 · 经文背诵 · 本周精读 
            </p>
          </motion.header>

          <div className="space-y-12">
            {SCHEDULE_DATA.map((week, weekIndex) => (
              <motion.section 
                key={week.range}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: weekIndex * 0.1 }}
                className="relative"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-neutral-200" />
                  <span className="text-sm font-mono text-neutral-400 uppercase tracking-widest bg-white px-4">
                    Week {weekIndex + 1}
                  </span>
                  <div className="h-px flex-1 bg-neutral-200" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Intensive Reading Part */}
                  <div className="lg:col-span-5">
                    <div className="lg:sticky lg:top-8 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center gap-2 mb-4 text-neutral-800 font-medium">
                        <BookOpen size={18} className="text-neutral-400" />
                        <h2>本周精读</h2>
                      </div>
                      
                      <div className="text-sm text-neutral-400 mb-2 font-mono">{week.range}</div>
                      
                      <div className="space-y-4">
                        {week.intensive.includes("交通") ? (
                           <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                              <Users size={16} className="mt-1 text-neutral-400" />
                              <p className="text-neutral-700 leading-relaxed text-sm bg-blue-50/30 p-2 rounded w-full">
                                {week.intensive}
                              </p>
                           </div>
                        ) : (
                          week.intensive.split('；').map((content, idx) => (
                            <div key={idx} className="flex items-start gap-3 group">
                              {content.includes('【书】') ? (
                                <BookOpen size={16} className="mt-1 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
                              ) : (
                                <Music size={16} className="mt-1 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
                              )}
                              <p className="text-neutral-700 leading-relaxed text-sm">
                                {content}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Daily Recitation Part */}
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-2 mb-4 text-neutral-800 font-medium px-2">
                      <Calendar size={18} className="text-neutral-400" />
                      <h2>每日背诵经文</h2>
                    </div>

                    <div className="space-y-2">
                      {week.days.map((day) => {
                        const isToday = day.date === currentDate;
                        return (
                          <motion.div
                            key={day.date}
                            whileHover={{ x: 4 }}
                            className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                              isToday 
                              ? "bg-neutral-900 text-white border-neutral-900 shadow-lg shadow-neutral-200" 
                              : "bg-white border-neutral-100 hover:border-neutral-300 hover:shadow-sm"
                            }`}
                          >
                            <div className="flex items-center gap-6">
                              <div className="flex flex-col">
                                <span className={`text-xs font-mono mb-0.5 ${isToday ? "text-neutral-400" : "text-neutral-400"}`}>
                                  {day.day}
                                </span>
                                <span className="font-serif font-medium tracking-tight">
                                  {day.date}
                                </span>
                              </div>
                              
                              <div className="h-8 w-px bg-neutral-200 group-hover:bg-neutral-300 mx-2" />

                              <div className="flex flex-col">
                                {day.verse === "无安排" ? (
                                  <span className={`text-sm italic ${isToday ? "text-neutral-500" : "text-neutral-300"}`}>
                                    今日无安排
                                  </span>
                                ) : (
                                  <span className="text-base font-medium">
                                    {day.verse}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {isToday && (
                              <div className="px-2 py-0.5 bg-white/10 rounded text-[10px] font-bold uppercase tracking-widest">
                                Today
                              </div>
                            )}
                            {!isToday && day.verse !== "无安排" && (
                              <ChevronRight size={14} className="text-neutral-200 group-hover:text-neutral-400 group-hover:translate-x-1 transition-all" />
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.section>
            ))}
          </div>

          <footer className="mt-24 pt-8 border-t border-neutral-100 text-center">
            <p className="text-xs text-neutral-400 font-mono tracking-widest uppercase mb-2">
              Stay Steadfast in the Word
            </p>
            <div className="flex justify-center gap-4">
               <div className="w-1.5 h-1.5 rounded-full bg-neutral-200" />
               <div className="w-1.5 h-1.5 rounded-full bg-neutral-200" />
               <div className="w-1.5 h-1.5 rounded-full bg-neutral-200" />
            </div>
          </footer>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        
        :root {
          --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
          --font-serif: 'Playfair Display', Georgia, serif;
        }

        body {
          font-family: var(--font-sans);
          -webkit-font-smoothing: antialiased;
        }

        .font-serif {
          font-family: var(--font-serif);
        }
      `}} />
    </div>
  );
}
