const Student = require('./models/Student');
const Notice  = require('./models/Notice');
const LostFound = require('./models/LostFound');

module.exports = async (req, res) => {
  try {
    // Clear existing
    await Student.deleteMany({});
    await Notice.deleteMany({});
    await LostFound.deleteMany({});

    // ── STUDENTS ──
    await Student.create([
      {
        rollNo: '4SF23CS021', name: 'Anoop K.', dept: 'CSE', semester: 4, password: 'demo123',
        attendance: [
          { subject:'CN',   attended:48, total:52, remaining:8  },
          { subject:'MES',  attended:42, total:48, remaining:10 },
          { subject:'DAA',  attended:37, total:50, remaining:12 },
          { subject:'DBMS', attended:44, total:46, remaining:6  },
        ],
        fees: [
          { name:'Tuition Fee',  amount:3200, due:'June 20, 2026', paid:false },
          { name:'Library Fee',  amount:1000, due:'June 20, 2026', paid:false },
          { name:'Exam Form',    amount:800,  due:'May 10, 2026',  paid:true  },
        ]
      },
      {
        rollNo: '4SF23CS125', name: 'Nithiesh Kumar', dept: 'CSE', semester: 4, password: 'demo123',
        attendance: [
          { subject:'CN',   attended:45, total:52, remaining:8  },
          { subject:'MES',  attended:40, total:48, remaining:10 },
          { subject:'DAA',  attended:38, total:50, remaining:12 },
          { subject:'DBMS', attended:43, total:46, remaining:6  },
        ],
        fees: [
          { name:'Tuition Fee', amount:3200, due:'June 20, 2026', paid:false },
        ]
      }
    ]);

    // ── NOTICES ──
    await Notice.create([
      {
        title: 'Last Date for Semester Fee Payment',
        body: 'All students of IV semester must pay tuition fee, library fee, and other mandatory charges by June 20, 2026. Late fee of ₹500 per week applies after deadline.',
        aiSummary: 'Pay all semester fees by June 20, 2026. Late fee ₹500/week after deadline. Pay online or at accounts office.',
        tag: 'FEES', urgent: true
      },
      {
        title: 'IV Semester Hall Ticket Download',
        body: 'Hall tickets for VTU IV semester June 2026 examinations are now available on the student portal. Students must download and print before exam date.',
        aiSummary: 'Download hall ticket from student portal now. No hall ticket = no entry. Exams start June 18.',
        tag: 'EXAM', urgent: true
      },
      {
        title: 'Annual Day Celebrations — June 28',
        body: 'Annual Day 2025-26 will be held on June 28, 2026. Register for cultural events from June 13-18 at the Student Activity Centre.',
        aiSummary: 'Annual Day on June 28. Register for cultural events June 13-18 at Student Activity Centre.',
        tag: 'GENERAL', urgent: false
      },
      {
        title: 'Revised Hostel Timings — Exam Period',
        body: 'Hostel entry extended to 10:30 PM during exam period (June 13 - July 5). All outings require a gate pass.',
        aiSummary: 'Exam period hostel entry extended to 10:30 PM (June 13 - July 5). Gate pass mandatory for outings.',
        tag: 'HOSTEL', urgent: false
      }
    ]);

    // ── LOST & FOUND ──
    await LostFound.create([
      {
        type:'lost', name:'Blue Nike Backpack', description:'Blue Nike backpack with laptop compartment. Small silver keychain on zip.',
        location:'Near Canteen', category:'Bag', poster:'Anoop K.', rollNo:'4SF23CS021'
      },
      {
        type:'found', name:'Blue Bag with Laptop', description:'Found a blue backpack (Nike logo) near library entrance. Silver keychain on zip. At security desk.',
        location:'Library Entrance', category:'Bag', poster:'Priya S.', rollNo:'4SF23CS099'
      },
    ]);

    res.json({ success: true, message: '✅ Database seeded with demo data!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};