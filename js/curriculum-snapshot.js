// Static curriculum snapshot copied from https://01.tomorrow-school.ai/api/object/astanahub.
// Contains public object metadata only; user progress stays live via GraphQL.
export const CURRICULUM_SNAPSHOT = [
  {
    "id": 110491,
    "name": "AI-Curriculum",
    "type": "module",
    "path": "/astanahub/ai-curriculum",
    "attrs": {
      "timeline": [
        {
          "month": 1,
          "minLevel": 0,
          "expectedLevel": 0,
          "checkpointLevel": 0,
          "rank": "Aspiring developer",
          "notes": "Online tests, Selection piscine"
        },
        {
          "month": 2,
          "minLevel": 5,
          "expectedLevel": 7,
          "checkpointLevel": 0,
          "notes": "Imperative programming, Structured programming, Algorithms (basics), Go language development, Infrastructure: network and security (basics)"
        },
        {
          "month": 3,
          "minLevel": 6,
          "expectedLevel": 10,
          "checkpointLevel": 0
        },
        {
          "month": 4,
          "minLevel": 9,
          "expectedLevel": 13,
          "checkpointLevel": 0
        },
        {
          "month": 5,
          "minLevel": 12,
          "expectedLevel": 17,
          "checkpointLevel": 10,
          "rank": "Beginner developer"
        },
        {
          "month": 6,
          "minLevel": 15,
          "expectedLevel": 18,
          "checkpointLevel": 20
        },
        {
          "month": 7,
          "minLevel": 17,
          "expectedLevel": 20,
          "checkpointLevel": 20,
          "notes": "Event-driven programming, Web architecture and tech: HTML, CSS, JavaScript & Node.js, Backend programming in Go & JS, Infrastructure: system administration, network, security (intermediate), Algorithms (intermediate), Software security (basics)"
        },
        {
          "month": 8,
          "minLevel": 20,
          "expectedLevel": 23,
          "checkpointLevel": 30,
          "rank": "Apprentice developer"
        },
        {
          "month": 9,
          "minLevel": 23,
          "expectedLevel": 27,
          "checkpointLevel": 30
        },
        {
          "month": 10,
          "minLevel": 28,
          "expectedLevel": 34,
          "checkpointLevel": 30
        },
        {
          "month": 11,
          "minLevel": 33,
          "expectedLevel": 38,
          "checkpointLevel": 40,
          "rank": "Assistant developer"
        },
        {
          "month": 12,
          "minLevel": 34,
          "expectedLevel": 38,
          "checkpointLevel": 40
        },
        {
          "month": 13,
          "minLevel": 37,
          "expectedLevel": 41,
          "checkpointLevel": 40,
          "notes": "Imperative programming (confirmed), Object-oriented programming and software architecture (confirmed), Network architecture design, Mathematics for AI, Infrastructure confirmed : system administration, network, security (confirmed), Software security (intermediate), Algorithms (advanced)"
        },
        {
          "month": 14,
          "minLevel": 39,
          "expectedLevel": 53,
          "checkpointLevel": 40
        },
        {
          "month": 15,
          "minLevel": 42,
          "expectedLevel": 54,
          "checkpointLevel": 40,
          "rank": "Basic developer"
        },
        {
          "month": 16,
          "minLevel": 45,
          "expectedLevel": 59,
          "checkpointLevel": 40
        },
        {
          "month": 17,
          "minLevel": 47,
          "expectedLevel": 60,
          "checkpointLevel": 40
        },
        {
          "month": 18,
          "minLevel": 50,
          "expectedLevel": 62,
          "checkpointLevel": 50,
          "rank": "Junior developer"
        }
      ],
      "ranksDefinitions": [
        {
          "name": "Aspiring developer",
          "level": 0,
          "milestone": "Passed the piscine"
        },
        {
          "name": "Beginner developer",
          "level": 10
        },
        {
          "name": "Apprentice developer",
          "level": 20
        },
        {
          "name": "Assistant developer",
          "level": 30
        },
        {
          "name": "Basic developer",
          "level": 40
        },
        {
          "name": "Junior developer",
          "level": 50
        },
        {
          "name": "Confirmed developer",
          "level": 55
        },
        {
          "name": "Full-Stack developer",
          "level": 60
        }
      ],
      "levelsDefinitions": [
        {
          "level": 10,
          "requirements": {
            "skills": {
              "prog": 10
            }
          }
        },
        {
          "level": 20,
          "requirements": {
            "skills": {
              "prog": 20
            }
          }
        },
        {
          "level": 30,
          "requirements": {
            "skills": {
              "prog": 30
            }
          }
        },
        {
          "level": 40,
          "requirements": {
            "skills": {
              "prog": 40
            }
          }
        },
        {
          "level": 50,
          "requirements": {
            "skills": {
              "prog": 50
            }
          }
        }
      ]
    }
  },
  {
    "id": 110793,
    "name": "ai-pong",
    "type": "project",
    "path": "/astanahub/ai-curriculum/ai-pong",
    "attrs": {
      "baseSkills": {
        "ai": 65,
        "ga": 50
      }
    }
  },
  {
    "id": 110804,
    "name": "binary-guard",
    "type": "project",
    "path": "/astanahub/ai-curriculum/binary-guard",
    "attrs": {
      "baseSkills": {
        "ml": 45,
        "math": 65,
        "stats": 65,
        "python": 65
      }
    }
  },
  {
    "id": 110766,
    "name": "brain-check",
    "type": "project",
    "path": "/astanahub/ai-curriculum/brain-check",
    "attrs": {
      "baseSkills": {
        "js": 70,
        "llm": 10,
        "nlp": 35,
        "python": 35,
        "back-end": 30
      }
    }
  },
  {
    "id": 110808,
    "name": "building-resume",
    "type": "project",
    "path": "/astanahub/ai-curriculum/building-resume",
    "attrs": {
      "baseSkills": {
        "employability": 20
      }
    }
  },
  {
    "id": 110768,
    "name": "cart-zone",
    "type": "project",
    "path": "/astanahub/ai-curriculum/cart-zone",
    "attrs": {
      "baseSkills": {
        "js": 85,
        "python": 25,
        "front-end": 20
      }
    }
  },
  {
    "id": 110851,
    "name": "js-array-chunk-reversal",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-array-chunk-reversal",
    "attrs": {
      "baseSkills": {
        "js": 5
      }
    }
  },
  {
    "id": 110856,
    "name": "js-bubble-sort-analyzer",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-bubble-sort-analyzer",
    "attrs": {
      "baseSkills": {
        "js": 5
      }
    }
  },
  {
    "id": 110876,
    "name": "js-character-maker",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-character-maker",
    "attrs": {
      "baseSkills": {
        "js": 5
      }
    }
  },
  {
    "id": 110868,
    "name": "js-deep-clone",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-deep-clone",
    "attrs": {
      "baseSkills": {
        "js": 10
      }
    }
  },
  {
    "id": 110869,
    "name": "js-deep-equal",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-deep-equal",
    "attrs": {
      "baseSkills": {
        "js": 10
      }
    }
  },
  {
    "id": 110870,
    "name": "js-deep-find",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-deep-find",
    "attrs": {
      "baseSkills": {
        "js": 10
      }
    }
  },
  {
    "id": 110871,
    "name": "js-deep-freeze",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-deep-freeze",
    "attrs": {
      "baseSkills": {
        "js": 10
      }
    }
  },
  {
    "id": 110850,
    "name": "js-divisor-finder",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-divisor-finder",
    "attrs": {
      "baseSkills": {
        "js": 5
      }
    }
  },
  {
    "id": 110861,
    "name": "js-election-mix",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-election-mix",
    "attrs": {
      "baseSkills": {
        "js": 5
      }
    }
  },
  {
    "id": 110848,
    "name": "js-even-sum",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-even-sum",
    "attrs": {
      "baseSkills": {
        "js": 5
      }
    }
  },
  {
    "id": 110866,
    "name": "js-exam-grader",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-exam-grader",
    "attrs": {
      "baseSkills": {
        "js": 5
      }
    }
  },
  {
    "id": 110846,
    "name": "js-factorial",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-factorial",
    "attrs": {
      "baseSkills": {
        "js": 5
      }
    }
  },
  {
    "id": 110847,
    "name": "js-fibonacci",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-fibonacci",
    "attrs": {
      "baseSkills": {
        "js": 5
      }
    }
  },
  {
    "id": 110865,
    "name": "js-final-attempt",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-final-attempt",
    "attrs": {
      "baseSkills": {
        "js": 5
      }
    }
  },
  {
    "id": 110862,
    "name": "js-flat-object",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-flat-object",
    "attrs": {
      "baseSkills": {
        "js": 5
      }
    }
  },
  {
    "id": 110872,
    "name": "js-flatten-object",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-flatten-object",
    "attrs": {
      "baseSkills": {
        "js": 10
      }
    }
  },
  {
    "id": 110854,
    "name": "js-grid-word-finder",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-grid-word-finder",
    "attrs": {
      "baseSkills": {
        "js": 5
      }
    }
  },
  {
    "id": 110859,
    "name": "js-grid-word-finder2",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-grid-word-finder2",
    "attrs": {
      "baseSkills": {
        "js": 5
      }
    }
  },
  {
    "id": 110857,
    "name": "js-insertion-sort-analyzer",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-insertion-sort-analyzer",
    "attrs": {
      "baseSkills": {
        "js": 5
      }
    }
  },
  {
    "id": 110855,
    "name": "js-nested-array-reverser",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-nested-array-reverser",
    "attrs": {
      "baseSkills": {
        "js": 5
      }
    }
  },
  {
    "id": 110860,
    "name": "js-object-lab",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-object-lab",
    "attrs": {
      "baseSkills": {
        "js": 5
      }
    }
  },
  {
    "id": 110852,
    "name": "js-palindromic-chains",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-palindromic-chains",
    "attrs": {
      "baseSkills": {
        "js": 5
      }
    }
  },
  {
    "id": 110849,
    "name": "js-perfect-num",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-perfect-num",
    "attrs": {
      "baseSkills": {
        "js": 5
      }
    }
  },
  {
    "id": 110863,
    "name": "js-pipeline",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-pipeline",
    "attrs": {
      "baseSkills": {
        "js": 5
      }
    }
  },
  {
    "id": 110853,
    "name": "js-sentence-pyramid",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-sentence-pyramid",
    "attrs": {
      "baseSkills": {
        "js": 5
      }
    }
  },
  {
    "id": 110864,
    "name": "js-sleep-breaker",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-sleep-breaker",
    "attrs": {
      "baseSkills": {
        "js": 5
      }
    }
  },
  {
    "id": 110858,
    "name": "js-snakepath-validator",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-snakepath-validator",
    "attrs": {
      "baseSkills": {
        "js": 5
      }
    }
  },
  {
    "id": 110873,
    "name": "js-swappable-object",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-swappable-object",
    "attrs": {
      "baseSkills": {
        "js": 10
      }
    }
  },
  {
    "id": 110874,
    "name": "js-transform-keys",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-transform-keys",
    "attrs": {
      "baseSkills": {
        "js": 10
      }
    }
  },
  {
    "id": 110875,
    "name": "js-trap-object",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-trap-object",
    "attrs": {
      "baseSkills": {
        "js": 10
      }
    }
  },
  {
    "id": 110867,
    "name": "js-zoo-race",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint-js/js-zoo-race",
    "attrs": {
      "baseSkills": {
        "js": 5
      }
    }
  },
  {
    "id": 110535,
    "name": "addprimesum",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/addprimesum",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 110551,
    "name": "brackets",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/brackets",
    "attrs": {
      "baseSkills": {
        "prog": 95
      }
    }
  },
  {
    "id": 110553,
    "name": "brainfuck",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/brainfuck",
    "attrs": {
      "baseSkills": {
        "prog": 100
      }
    }
  },
  {
    "id": 110515,
    "name": "cameltosnakecase",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/cameltosnakecase",
    "attrs": {
      "baseSkills": {
        "prog": 35
      }
    }
  },
  {
    "id": 110537,
    "name": "canjump",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/canjump",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 110500,
    "name": "checknumber",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/checknumber",
    "attrs": {
      "baseSkills": {
        "prog": 10
      }
    }
  },
  {
    "id": 110534,
    "name": "chunk",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/chunk",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 110526,
    "name": "concatalternate",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/concatalternate",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 110530,
    "name": "concatslice",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/concatslice",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 110501,
    "name": "countalpha",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/countalpha",
    "attrs": {
      "baseSkills": {
        "prog": 10
      }
    }
  },
  {
    "id": 110499,
    "name": "countcharacter",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/countcharacter",
    "attrs": {
      "baseSkills": {
        "prog": 10
      }
    }
  },
  {
    "id": 110512,
    "name": "countrepeats",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/countrepeats",
    "attrs": {
      "baseSkills": {
        "prog": 20
      }
    }
  },
  {
    "id": 110505,
    "name": "digitlen",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/digitlen",
    "attrs": {
      "baseSkills": {
        "prog": 20
      }
    }
  },
  {
    "id": 110540,
    "name": "fifthandskip",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/fifthandskip",
    "attrs": {
      "baseSkills": {
        "prog": 65
      }
    }
  },
  {
    "id": 110545,
    "name": "findpairs",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/findpairs",
    "attrs": {
      "baseSkills": {
        "prog": 75
      }
    }
  },
  {
    "id": 110516,
    "name": "findprevprime",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/findprevprime",
    "attrs": {
      "baseSkills": {
        "prog": 35
      }
    }
  },
  {
    "id": 110510,
    "name": "firstword",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/firstword",
    "attrs": {
      "baseSkills": {
        "prog": 20
      }
    }
  },
  {
    "id": 110506,
    "name": "fishandchips",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/fishandchips",
    "attrs": {
      "baseSkills": {
        "prog": 20
      }
    }
  },
  {
    "id": 110536,
    "name": "fprime",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/fprime",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 110523,
    "name": "fromto",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/fromto",
    "attrs": {
      "baseSkills": {
        "prog": 35
      }
    }
  },
  {
    "id": 110507,
    "name": "gcd",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/gcd",
    "attrs": {
      "baseSkills": {
        "prog": 20
      }
    }
  },
  {
    "id": 110552,
    "name": "grouping",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/grouping",
    "attrs": {
      "baseSkills": {
        "prog": 100
      }
    }
  },
  {
    "id": 110508,
    "name": "hashcode",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/hashcode",
    "attrs": {
      "baseSkills": {
        "prog": 20
      }
    }
  },
  {
    "id": 110529,
    "name": "hiddenp",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/hiddenp",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 110531,
    "name": "inter",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/inter",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 110522,
    "name": "iscapitalized",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/iscapitalized",
    "attrs": {
      "baseSkills": {
        "prog": 35
      }
    }
  },
  {
    "id": 110521,
    "name": "itoa",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/itoa",
    "attrs": {
      "baseSkills": {
        "prog": 35
      }
    }
  },
  {
    "id": 110549,
    "name": "itoabase",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/itoabase",
    "attrs": {
      "baseSkills": {
        "prog": 85
      }
    }
  },
  {
    "id": 110509,
    "name": "lastword",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/lastword",
    "attrs": {
      "baseSkills": {
        "prog": 20
      }
    }
  },
  {
    "id": 110514,
    "name": "longestword",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/longestword",
    "attrs": {
      "baseSkills": {
        "prog": 20
      }
    }
  },
  {
    "id": 110538,
    "name": "notdecimal",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/notdecimal",
    "attrs": {
      "baseSkills": {
        "prog": 65
      }
    }
  },
  {
    "id": 110496,
    "name": "only1",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/only1",
    "attrs": {
      "baseSkills": {
        "prog": 5
      }
    }
  },
  {
    "id": 110493,
    "name": "onlya",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/onlya",
    "attrs": {
      "baseSkills": {
        "prog": 5
      }
    }
  },
  {
    "id": 110497,
    "name": "onlyb",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/onlyb",
    "attrs": {
      "baseSkills": {
        "prog": 5
      }
    }
  },
  {
    "id": 110495,
    "name": "onlyf",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/onlyf",
    "attrs": {
      "baseSkills": {
        "prog": 5
      }
    }
  },
  {
    "id": 110494,
    "name": "onlyz",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/onlyz",
    "attrs": {
      "baseSkills": {
        "prog": 5
      }
    }
  },
  {
    "id": 110546,
    "name": "options",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/options",
    "attrs": {
      "baseSkills": {
        "prog": 85
      }
    }
  },
  {
    "id": 110525,
    "name": "passwordentropy",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/passwordentropy",
    "attrs": {
      "baseSkills": {
        "prog": 35
      }
    }
  },
  {
    "id": 110548,
    "name": "piglatin",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/piglatin",
    "attrs": {
      "baseSkills": {
        "prog": 85
      }
    }
  },
  {
    "id": 110502,
    "name": "printif",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/printif",
    "attrs": {
      "baseSkills": {
        "prog": 10
      }
    }
  },
  {
    "id": 110503,
    "name": "printifnot",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/printifnot",
    "attrs": {
      "baseSkills": {
        "prog": 10
      }
    }
  },
  {
    "id": 110519,
    "name": "printmemory",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/printmemory",
    "attrs": {
      "baseSkills": {
        "prog": 35
      }
    }
  },
  {
    "id": 110518,
    "name": "printrevcomb",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/printrevcomb",
    "attrs": {
      "baseSkills": {
        "prog": 35
      }
    }
  },
  {
    "id": 110498,
    "name": "rectperimeter",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/rectperimeter",
    "attrs": {
      "baseSkills": {
        "prog": 10
      }
    }
  },
  {
    "id": 110511,
    "name": "repeatalpha",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/repeatalpha",
    "attrs": {
      "baseSkills": {
        "prog": 20
      }
    }
  },
  {
    "id": 110504,
    "name": "retainfirsthalf",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/retainfirsthalf",
    "attrs": {
      "baseSkills": {
        "prog": 10
      }
    }
  },
  {
    "id": 110541,
    "name": "revconcatalternate",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/revconcatalternate",
    "attrs": {
      "baseSkills": {
        "prog": 65
      }
    }
  },
  {
    "id": 110527,
    "name": "reversestrcap",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/reversestrcap",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 110543,
    "name": "revwstr",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/revwstr",
    "attrs": {
      "baseSkills": {
        "prog": 75
      }
    }
  },
  {
    "id": 110547,
    "name": "romannumbers",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/romannumbers",
    "attrs": {
      "baseSkills": {
        "prog": 85
      }
    }
  },
  {
    "id": 110544,
    "name": "rostring",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/rostring",
    "attrs": {
      "baseSkills": {
        "prog": 75
      }
    }
  },
  {
    "id": 110550,
    "name": "rpncalc",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/rpncalc",
    "attrs": {
      "baseSkills": {
        "prog": 95
      }
    }
  },
  {
    "id": 110533,
    "name": "saveandmiss",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/saveandmiss",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 110539,
    "name": "slice",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/slice",
    "attrs": {
      "baseSkills": {
        "prog": 65
      }
    }
  },
  {
    "id": 110517,
    "name": "thirdtimeisacharm",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/thirdtimeisacharm",
    "attrs": {
      "baseSkills": {
        "prog": 35
      }
    }
  },
  {
    "id": 110532,
    "name": "union",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/union",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 110528,
    "name": "wdmatch",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/wdmatch",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 110520,
    "name": "weareunique",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/weareunique",
    "attrs": {
      "baseSkills": {
        "prog": 35
      }
    }
  },
  {
    "id": 110513,
    "name": "wordanatomy",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/wordanatomy",
    "attrs": {
      "baseSkills": {
        "prog": 20
      }
    }
  },
  {
    "id": 110542,
    "name": "wordflip",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/wordflip",
    "attrs": {
      "baseSkills": {
        "prog": 75
      }
    }
  },
  {
    "id": 110524,
    "name": "zipstring",
    "type": "exercise",
    "path": "/astanahub/ai-curriculum/checkpoint/zipstring",
    "attrs": {
      "baseSkills": {
        "prog": 35
      }
    }
  },
  {
    "id": 110803,
    "name": "cluster-garden",
    "type": "project",
    "path": "/astanahub/ai-curriculum/cluster-garden",
    "attrs": {
      "baseSkills": {
        "ml": 45,
        "math": 60,
        "stats": 50,
        "python": 60
      }
    }
  },
  {
    "id": 110797,
    "name": "credit-scoring",
    "type": "project",
    "path": "/astanahub/ai-curriculum/credit-scoring",
    "attrs": {
      "baseSkills": {
        "ai": 80
      }
    }
  },
  {
    "id": 110800,
    "name": "digit-detect",
    "type": "project",
    "path": "/astanahub/ai-curriculum/digit-detect",
    "attrs": {
      "baseSkills": {
        "ml": 40,
        "math": 45,
        "stats": 35,
        "python": 45
      }
    }
  },
  {
    "id": 110582,
    "name": "discuss-auth",
    "type": "project",
    "path": "/astanahub/ai-curriculum/discuss-auth",
    "attrs": {
      "baseSkills": {
        "back-end": 45,
        "sys-admin": 10
      }
    }
  },
  {
    "id": 110581,
    "name": "discuss-hub",
    "type": "project",
    "path": "/astanahub/ai-curriculum/discuss-hub",
    "attrs": {
      "baseSkills": {
        "ai": 24,
        "go": 45,
        "sql": 25,
        "html": 35,
        "docker": 15,
        "back-end": 35,
        "front-end": 40,
        "sys-admin": 5
      }
    }
  },
  {
    "id": 110585,
    "name": "discuss-moderation",
    "type": "project",
    "path": "/astanahub/ai-curriculum/discuss-moderation",
    "attrs": {
      "baseSkills": {
        "back-end": 42,
        "sys-admin": 10
      }
    }
  },
  {
    "id": 110586,
    "name": "discuss-plus",
    "type": "project",
    "path": "/astanahub/ai-curriculum/discuss-plus",
    "attrs": {
      "baseSkills": {
        "back-end": 50,
        "front-end": 45
      }
    }
  },
  {
    "id": 110584,
    "name": "discuss-security",
    "type": "project",
    "path": "/astanahub/ai-curriculum/discuss-security",
    "attrs": {
      "baseSkills": {
        "go": 49,
        "back-end": 47,
        "sys-admin": 15
      }
    }
  },
  {
    "id": 110583,
    "name": "discuss-upload",
    "type": "project",
    "path": "/astanahub/ai-curriculum/discuss-upload",
    "attrs": {
      "baseSkills": {
        "go": 47,
        "html": 35,
        "back-end": 40,
        "front-end": 42
      }
    }
  },
  {
    "id": 110792,
    "name": "doc-classify",
    "type": "project",
    "path": "/astanahub/ai-curriculum/doc-classify",
    "attrs": {
      "baseSkills": {
        "ai": 60
      }
    }
  },
  {
    "id": 110762,
    "name": "doc-genius",
    "type": "project",
    "path": "/astanahub/ai-curriculum/doc-genius",
    "attrs": {
      "baseSkills": {
        "js": 30,
        "llm": 15,
        "nlp": 20,
        "python": 45,
        "front-end": 35
      }
    }
  },
  {
    "id": 110795,
    "name": "emotions-detector",
    "type": "project",
    "path": "/astanahub/ai-curriculum/emotions-detector",
    "attrs": {
      "baseSkills": {
        "ai": 70
      }
    }
  },
  {
    "id": 110807,
    "name": "evo-sim",
    "type": "project",
    "path": "/astanahub/ai-curriculum/evo-sim",
    "attrs": {
      "baseSkills": {
        "ga": 30,
        "ml": 45,
        "algo": 50,
        "math": 65,
        "stats": 90,
        "python": 65
      }
    }
  },
  {
    "id": 110763,
    "name": "flow-lang",
    "type": "project",
    "path": "/astanahub/ai-curriculum/flow-lang",
    "attrs": {
      "baseSkills": {
        "js": 40,
        "ml": 15,
        "llm": 15,
        "nlp": 25,
        "docker": 15,
        "python": 50,
        "back-end": 35,
        "front-end": 40
      }
    }
  },
  {
    "id": 110591,
    "name": "folder-scan",
    "type": "project",
    "path": "/astanahub/ai-curriculum/folder-scan",
    "attrs": {
      "baseSkills": {
        "ai": 18,
        "go": 30,
        "unix": 15
      }
    }
  },
  {
    "id": 110587,
    "name": "git",
    "type": "project",
    "path": "/astanahub/ai-curriculum/git",
    "attrs": {
      "baseSkills": {
        "git": 50
      }
    }
  },
  {
    "id": 110564,
    "name": "go-refresh",
    "type": "project",
    "path": "/astanahub/ai-curriculum/go-refresh",
    "attrs": {
      "baseSkills": {
        "ai": 10,
        "go": 20,
        "algo": 15
      }
    }
  },
  {
    "id": 110801,
    "name": "grade-tree",
    "type": "project",
    "path": "/astanahub/ai-curriculum/grade-tree",
    "attrs": {
      "baseSkills": {
        "ml": 45,
        "math": 50,
        "stats": 40,
        "python": 50
      }
    }
  },
  {
    "id": 110812,
    "name": "interview-practices",
    "type": "project",
    "path": "/astanahub/ai-curriculum/interview-practices",
    "attrs": {
      "baseSkills": {
        "employability": 20
      }
    }
  },
  {
    "id": 110787,
    "name": "kaggle-titanic",
    "type": "project",
    "path": "/astanahub/ai-curriculum/kaggle-titanic",
    "attrs": {
      "baseSkills": {
        "ai": 35
      }
    }
  },
  {
    "id": 110798,
    "name": "linear-model",
    "type": "project",
    "path": "/astanahub/ai-curriculum/linear-model",
    "attrs": {
      "baseSkills": {
        "ml": 30,
        "math": 35,
        "stats": 20,
        "python": 35
      }
    }
  },
  {
    "id": 110811,
    "name": "market-exploration",
    "type": "project",
    "path": "/astanahub/ai-curriculum/market-exploration",
    "attrs": {
      "baseSkills": {
        "employability": 20
      }
    }
  },
  {
    "id": 110765,
    "name": "market-lab",
    "type": "project",
    "path": "/astanahub/ai-curriculum/market-lab",
    "attrs": {
      "baseSkills": {
        "js": 60,
        "llm": 15,
        "nlp": 30,
        "rag": 10,
        "algo": 40,
        "python": 30
      }
    }
  },
  {
    "id": 110789,
    "name": "matrix-factorization",
    "type": "project",
    "path": "/astanahub/ai-curriculum/matrix-factorization",
    "attrs": {
      "baseSkills": {
        "ai": 45
      }
    }
  },
  {
    "id": 110805,
    "name": "matrix-match",
    "type": "project",
    "path": "/astanahub/ai-curriculum/matrix-match",
    "attrs": {
      "baseSkills": {
        "ml": 45,
        "math": 55,
        "stats": 80,
        "python": 55
      }
    }
  },
  {
    "id": 110592,
    "name": "net-link",
    "type": "project",
    "path": "/astanahub/ai-curriculum/net-link",
    "attrs": {
      "baseSkills": {
        "ai": 20,
        "go": 35,
        "tcp": 30,
        "unix": 15
      }
    }
  },
  {
    "id": 110810,
    "name": "networking-practices",
    "type": "project",
    "path": "/astanahub/ai-curriculum/networking-practices",
    "attrs": {
      "baseSkills": {
        "employability": 20
      }
    }
  },
  {
    "id": 110802,
    "name": "neuro-genesis",
    "type": "project",
    "path": "/astanahub/ai-curriculum/neuro-genesis",
    "attrs": {
      "baseSkills": {
        "ml": 50,
        "math": 55,
        "python": 55
      }
    }
  },
  {
    "id": 110788,
    "name": "nlp-scraper",
    "type": "project",
    "path": "/astanahub/ai-curriculum/nlp-scraper",
    "attrs": {
      "baseSkills": {
        "ai": 40
      }
    }
  },
  {
    "id": 110580,
    "name": "path-flow",
    "type": "project",
    "path": "/astanahub/ai-curriculum/path-flow",
    "attrs": {
      "baseSkills": {
        "ai": 22,
        "go": 40,
        "algo": 35
      }
    }
  },
  {
    "id": 110809,
    "name": "personal-branding",
    "type": "project",
    "path": "/astanahub/ai-curriculum/personal-branding",
    "attrs": {
      "baseSkills": {
        "employability": 20
      }
    }
  },
  {
    "id": 110799,
    "name": "picture-perfect",
    "type": "project",
    "path": "/astanahub/ai-curriculum/picture-perfect",
    "attrs": {
      "baseSkills": {
        "ml": 25,
        "math": 40,
        "stats": 30,
        "python": 40
      }
    }
  },
  {
    "id": 110769,
    "name": "Piscine AI",
    "type": "piscine",
    "path": "/astanahub/ai-curriculum/piscine-ai",
    "attrs": {
      "baseSkills": {
        "ai": 30
      }
    }
  },
  {
    "id": 110593,
    "name": "Piscine JS",
    "type": "piscine",
    "path": "/astanahub/ai-curriculum/piscine-js",
    "attrs": {
      "baseSkills": {
        "js": 35
      }
    }
  },
  {
    "id": 110717,
    "name": "Piscine Python",
    "type": "piscine",
    "path": "/astanahub/ai-curriculum/piscine-python",
    "attrs": {
      "baseSkills": {
        "python": 35
      }
    }
  },
  {
    "id": 110764,
    "name": "product-discovery",
    "type": "project",
    "path": "/astanahub/ai-curriculum/product-discovery",
    "attrs": {
      "baseSkills": {
        "js": 50,
        "ml": 20,
        "mlops": 10,
        "python": 55,
        "front-end": 45
      }
    }
  },
  {
    "id": 110554,
    "name": "Prompt Piscine",
    "type": "piscine",
    "path": "/astanahub/ai-curriculum/prompt-piscine",
    "attrs": {
      "baseSkills": {
        "ai": 8
      }
    }
  },
  {
    "id": 110760,
    "name": "scan-sense",
    "type": "project",
    "path": "/astanahub/ai-curriculum/scan-sense",
    "attrs": {
      "baseSkills": {
        "cv": 15,
        "js": 37,
        "ml": 10,
        "python": 35,
        "front-end": 25
      }
    }
  },
  {
    "id": 110796,
    "name": "sp500-strategies",
    "type": "project",
    "path": "/astanahub/ai-curriculum/sp500-strategies",
    "attrs": {
      "baseSkills": {
        "ai": 75
      }
    }
  },
  {
    "id": 110790,
    "name": "spectral-learning",
    "type": "project",
    "path": "/astanahub/ai-curriculum/spectral-learning",
    "attrs": {
      "baseSkills": {
        "ai": 50
      }
    }
  },
  {
    "id": 110806,
    "name": "sudoku-solver",
    "type": "project",
    "path": "/astanahub/ai-curriculum/sudoku-solver",
    "attrs": {
      "baseSkills": {
        "algo": 55,
        "math": 60,
        "python": 60
      }
    }
  },
  {
    "id": 110590,
    "name": "swap-sort",
    "type": "project",
    "path": "/astanahub/ai-curriculum/swap-sort",
    "attrs": {
      "baseSkills": {
        "go": 30,
        "algo": 35
      }
    }
  },
  {
    "id": 110565,
    "name": "symbol-art",
    "type": "project",
    "path": "/astanahub/ai-curriculum/symbol-art",
    "attrs": {
      "baseSkills": {
        "ai": 12,
        "go": 25,
        "algo": 20
      }
    }
  },
  {
    "id": 110567,
    "name": "symbol-color",
    "type": "project",
    "path": "/astanahub/ai-curriculum/symbol-color",
    "attrs": {
      "baseSkills": {
        "go": 27
      }
    }
  },
  {
    "id": 110569,
    "name": "symbol-fs",
    "type": "project",
    "path": "/astanahub/ai-curriculum/symbol-fs",
    "attrs": {
      "baseSkills": {
        "go": 26
      }
    }
  },
  {
    "id": 110566,
    "name": "symbol-invert",
    "type": "project",
    "path": "/astanahub/ai-curriculum/symbol-invert",
    "attrs": {
      "baseSkills": {
        "go": 30
      }
    }
  },
  {
    "id": 110570,
    "name": "symbol-justify",
    "type": "project",
    "path": "/astanahub/ai-curriculum/symbol-justify",
    "attrs": {
      "baseSkills": {
        "go": 29
      }
    }
  },
  {
    "id": 110568,
    "name": "symbol-output",
    "type": "project",
    "path": "/astanahub/ai-curriculum/symbol-output",
    "attrs": {
      "baseSkills": {
        "go": 28
      }
    }
  },
  {
    "id": 110571,
    "name": "symbol-web",
    "type": "project",
    "path": "/astanahub/ai-curriculum/symbol-web",
    "attrs": {
      "baseSkills": {
        "ai": 14,
        "go": 35,
        "html": 10,
        "back-end": 10,
        "front-end": 10
      }
    }
  },
  {
    "id": 110573,
    "name": "symbol-web-dockerize",
    "type": "project",
    "path": "/astanahub/ai-curriculum/symbol-web-dockerize",
    "attrs": {
      "baseSkills": {
        "docker": 10,
        "back-end": 15
      }
    }
  },
  {
    "id": 110574,
    "name": "symbol-web-export",
    "type": "project",
    "path": "/astanahub/ai-curriculum/symbol-web-export",
    "attrs": {
      "baseSkills": {
        "back-end": 20
      }
    }
  },
  {
    "id": 110572,
    "name": "symbol-web-stylize",
    "type": "project",
    "path": "/astanahub/ai-curriculum/symbol-web-stylize",
    "attrs": {
      "baseSkills": {
        "css": 10,
        "html": 15,
        "front-end": 20
      }
    }
  },
  {
    "id": 110589,
    "name": "teller-system",
    "type": "project",
    "path": "/astanahub/ai-curriculum/teller-system",
    "attrs": {
      "baseSkills": {
        "c": 30
      }
    }
  },
  {
    "id": 110588,
    "name": "tetris-fit",
    "type": "project",
    "path": "/astanahub/ai-curriculum/tetris-fit",
    "attrs": {
      "baseSkills": {
        "go": 30,
        "algo": 35
      }
    }
  },
  {
    "id": 110576,
    "name": "tour-filters",
    "type": "project",
    "path": "/astanahub/ai-curriculum/tour-filters",
    "attrs": {
      "baseSkills": {
        "go": 36,
        "front-end": 30
      }
    }
  },
  {
    "id": 110577,
    "name": "tour-geo",
    "type": "project",
    "path": "/astanahub/ai-curriculum/tour-geo",
    "attrs": {
      "baseSkills": {
        "back-end": 15
      }
    }
  },
  {
    "id": 110579,
    "name": "tour-search",
    "type": "project",
    "path": "/astanahub/ai-curriculum/tour-search",
    "attrs": {
      "baseSkills": {
        "go": 38,
        "back-end": 10
      }
    }
  },
  {
    "id": 110575,
    "name": "tour-track",
    "type": "project",
    "path": "/astanahub/ai-curriculum/tour-track",
    "attrs": {
      "baseSkills": {
        "ai": 16,
        "go": 35,
        "html": 25,
        "back-end": 10,
        "front-end": 25
      }
    }
  },
  {
    "id": 110578,
    "name": "tour-visuals",
    "type": "project",
    "path": "/astanahub/ai-curriculum/tour-visuals",
    "attrs": {
      "baseSkills": {
        "css": 15,
        "html": 27,
        "front-end": 35
      }
    }
  },
  {
    "id": 110794,
    "name": "triton-deploy",
    "type": "project",
    "path": "/astanahub/ai-curriculum/triton-deploy",
    "attrs": {
      "baseSkills": {
        "ai": 85,
        "mlops": 30
      }
    }
  },
  {
    "id": 110761,
    "name": "vision-classify",
    "type": "project",
    "path": "/astanahub/ai-curriculum/vision-classify",
    "attrs": {
      "baseSkills": {
        "cv": 25,
        "js": 30,
        "ml": 20,
        "python": 40,
        "back-end": 25,
        "front-end": 30
      }
    }
  },
  {
    "id": 110791,
    "name": "vision-track",
    "type": "project",
    "path": "/astanahub/ai-curriculum/vision-track",
    "attrs": {
      "baseSkills": {
        "ai": 55
      }
    }
  },
  {
    "id": 110767,
    "name": "watch-flow",
    "type": "project",
    "path": "/astanahub/ai-curriculum/watch-flow",
    "attrs": {
      "baseSkills": {
        "js": 80,
        "python": 30,
        "back-end": 20,
        "front-end": 20
      }
    }
  },
  {
    "id": 102074,
    "name": "Module",
    "type": "module",
    "path": "/astanahub/module",
    "attrs": {
      "timeline": [
        {
          "month": 1,
          "minLevel": 0,
          "expectedLevel": 0,
          "checkpointLevel": 0,
          "rank": "Aspiring developer",
          "notes": "Online tests, Selection piscine",
          "skills": null
        },
        {
          "month": 2,
          "minLevel": 5,
          "expectedLevel": 7,
          "checkpointLevel": 0,
          "notes": "Imperative programming, Structured programming, Algorithms (basics), Go language development, Infrastructure: network and security (basics)",
          "skills": null
        },
        {
          "month": 3,
          "minLevel": 6,
          "expectedLevel": 10,
          "checkpointLevel": 0
        },
        {
          "month": 4,
          "minLevel": 9,
          "expectedLevel": 13,
          "checkpointLevel": 0
        },
        {
          "month": 5,
          "minLevel": 12,
          "expectedLevel": 17,
          "checkpointLevel": 10,
          "rank": "Beginner developer"
        },
        {
          "month": 6,
          "minLevel": 15,
          "expectedLevel": 18,
          "checkpointLevel": 20
        },
        {
          "month": 7,
          "minLevel": 17,
          "expectedLevel": 20,
          "checkpointLevel": 20,
          "notes": "Event-driven programming, Web architecture and tech: HTML, CSS, JavaScript & Node.js, Backend programming in Go & JS, Infrastructure: system administration, network, security (intermediate), Algorithms (intermediate), Software security (basics)",
          "skills": null
        },
        {
          "month": 8,
          "minLevel": 20,
          "expectedLevel": 23,
          "checkpointLevel": 30,
          "rank": "Apprentice developer"
        },
        {
          "month": 9,
          "minLevel": 23,
          "expectedLevel": 27,
          "checkpointLevel": 30
        },
        {
          "month": 10,
          "minLevel": 28,
          "expectedLevel": 34,
          "checkpointLevel": 30
        },
        {
          "month": 11,
          "minLevel": 33,
          "expectedLevel": 38,
          "checkpointLevel": 40,
          "rank": "Assistant developer"
        },
        {
          "month": 12,
          "minLevel": 34,
          "expectedLevel": 38,
          "checkpointLevel": 40
        },
        {
          "month": 13,
          "minLevel": 37,
          "expectedLevel": 41,
          "checkpointLevel": 40,
          "notes": "Imperative programming (confirmed), Object-oriented programming and sofware architecture (confirmed), Network architecture design, Rust language programming, Infrastructure confirmed : system administration, network, security (confirmed), Software security (intermediate), Algorithms (advanced)",
          "skills": null
        },
        {
          "month": 14,
          "minLevel": 39,
          "expectedLevel": 53,
          "checkpointLevel": 40
        },
        {
          "month": 15,
          "minLevel": 42,
          "expectedLevel": 54,
          "checkpointLevel": 40,
          "rank": "Basic developer"
        },
        {
          "month": 16,
          "minLevel": 45,
          "expectedLevel": 59,
          "checkpointLevel": 40
        },
        {
          "month": 17,
          "minLevel": 47,
          "expectedLevel": 60,
          "checkpointLevel": 40
        },
        {
          "month": 18,
          "minLevel": 50,
          "expectedLevel": 62,
          "checkpointLevel": 50,
          "rank": "Junior developer"
        }
      ],
      "ranksDefinitions": [
        {
          "name": "Aspiring developer",
          "level": 0,
          "milestone": "Passed the piscine"
        },
        {
          "name": "Beginner developer",
          "level": 10
        },
        {
          "name": "Apprentice developer",
          "level": 20
        },
        {
          "name": "Assistant developer",
          "level": 30
        },
        {
          "name": "Basic developer",
          "level": 40
        },
        {
          "name": "Junior developer",
          "level": 50
        },
        {
          "name": "Confirmed developer",
          "level": 55
        },
        {
          "name": "Full-Stack developer",
          "level": 60
        }
      ],
      "levelsDefinitions": [
        {
          "level": 10,
          "requirements": {
            "skills": {
              "prog": 10
            }
          }
        },
        {
          "level": 20,
          "requirements": {
            "skills": {
              "prog": 20
            }
          }
        },
        {
          "level": 30,
          "requirements": {
            "skills": {
              "prog": 30
            }
          }
        },
        {
          "level": 40,
          "requirements": {
            "skills": {
              "prog": 40
            }
          }
        },
        {
          "level": 50,
          "requirements": {
            "skills": {
              "prog": 50
            }
          }
        }
      ]
    }
  },
  {
    "id": 102115,
    "name": "0-shell",
    "type": "project",
    "path": "/astanahub/module/0-shell",
    "attrs": {
      "baseSkills": {
        "sh": 20,
        "unix": 35
      }
    }
  },
  {
    "id": 102636,
    "name": "a-table",
    "type": "project",
    "path": "/astanahub/module/a-table",
    "attrs": {
      "baseSkills": {
        "ux": 55
      }
    }
  },
  {
    "id": 102604,
    "name": "active",
    "type": "project",
    "path": "/astanahub/module/active",
    "attrs": {
      "baseSkills": {
        "cybersecurity": 36
      }
    }
  },
  {
    "id": 102431,
    "name": "add-vm",
    "type": "project",
    "path": "/astanahub/module/add-vm",
    "attrs": {
      "baseSkills": {
        "unix": 35
      }
    }
  },
  {
    "id": 102080,
    "name": "forum-advanced-features",
    "type": "project",
    "path": "/astanahub/module/advanced-features",
    "attrs": {
      "baseSkills": {
        "back-end": 50,
        "front-end": 45
      }
    }
  },
  {
    "id": 103082,
    "name": "ai-ping-pong",
    "type": "project",
    "path": "/astanahub/module/ai-ping-pong",
    "attrs": {
      "baseSkills": {
        "ai": 65
      }
    }
  },
  {
    "id": 102764,
    "name": "angul-it",
    "type": "project",
    "path": "/astanahub/module/angul-it",
    "attrs": {
      "baseSkills": {
        "front-end": 30
      }
    }
  },
  {
    "id": 102411,
    "name": "army-of-one",
    "type": "project",
    "path": "/astanahub/module/army-of-one",
    "attrs": {
      "baseSkills": {
        "game": 41
      }
    }
  },
  {
    "id": 102083,
    "name": "ascii-art",
    "type": "project",
    "path": "/astanahub/module/ascii-art",
    "attrs": {
      "baseSkills": {
        "go": 25,
        "algo": 20
      }
    }
  },
  {
    "id": 102090,
    "name": "ascii-art-web",
    "type": "project",
    "path": "/astanahub/module/ascii-art-web",
    "attrs": {
      "baseSkills": {
        "go": 35,
        "html": 10,
        "back-end": 10,
        "front-end": 10
      }
    }
  },
  {
    "id": 102419,
    "name": "atm-management-system",
    "type": "project",
    "path": "/astanahub/module/atm-management-system",
    "attrs": {
      "baseSkills": {
        "c": 30
      }
    }
  },
  {
    "id": 102076,
    "name": "forum-authentication",
    "type": "project",
    "path": "/astanahub/module/authentication",
    "attrs": {
      "baseSkills": {
        "back-end": 45,
        "sys-admin": 10
      }
    }
  },
  {
    "id": 102109,
    "name": "bomberman-dom",
    "type": "project",
    "path": "/astanahub/module/bomberman-dom",
    "attrs": {
      "baseSkills": {
        "js": 55,
        "game": 20
      }
    }
  },
  {
    "id": 102765,
    "name": "buy-01",
    "type": "project",
    "path": "/astanahub/module/buy-01",
    "attrs": {
      "baseSkills": {
        "java": 40,
        "docker": 20,
        "no-sql": 25,
        "back-end": 58,
        "front-end": 35
      }
    }
  },
  {
    "id": 102768,
    "name": "buy-02",
    "type": "project",
    "path": "/astanahub/module/buy-02",
    "attrs": {
      "baseSkills": {
        "java": 50,
        "docker": 25,
        "no-sql": 30,
        "back-end": 60,
        "front-end": 37
      }
    }
  },
  {
    "id": 102452,
    "name": "addprimesum",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/addprimesum",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 102449,
    "name": "brackets",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/brackets",
    "attrs": {
      "baseSkills": {
        "prog": 95
      }
    }
  },
  {
    "id": 102450,
    "name": "brainfuck",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/brainfuck",
    "attrs": {
      "baseSkills": {
        "prog": 100
      }
    }
  },
  {
    "id": 102471,
    "name": "cameltosnakecase",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/cameltosnakecase",
    "attrs": {
      "baseSkills": {
        "prog": 20
      }
    }
  },
  {
    "id": 102494,
    "name": "canjump",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/canjump",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 102468,
    "name": "checknumber",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/checknumber",
    "attrs": {
      "baseSkills": {
        "prog": 10
      }
    }
  },
  {
    "id": 102465,
    "name": "chunk",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/chunk",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 102451,
    "name": "cleanstr",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/cleanstr",
    "attrs": {
      "baseSkills": {
        "prog": 35
      }
    }
  },
  {
    "id": 102487,
    "name": "concatalternate",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/concatalternate",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 102481,
    "name": "concatslice",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/concatslice",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 102493,
    "name": "countalpha",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/countalpha",
    "attrs": {
      "baseSkills": {
        "prog": 10
      }
    }
  },
  {
    "id": 102473,
    "name": "countcharacter",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/countcharacter",
    "attrs": {
      "baseSkills": {
        "prog": 10
      }
    }
  },
  {
    "id": 102483,
    "name": "digitlen",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/digitlen",
    "attrs": {
      "baseSkills": {
        "prog": 20
      }
    }
  },
  {
    "id": 102442,
    "name": "expandstr",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/expandstr",
    "attrs": {
      "baseSkills": {
        "prog": 35
      }
    }
  },
  {
    "id": 102478,
    "name": "fifthandskip",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/fifthandskip",
    "attrs": {
      "baseSkills": {
        "prog": 65
      }
    }
  },
  {
    "id": 102495,
    "name": "findpairs",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/findpairs",
    "attrs": {
      "baseSkills": {
        "prog": 75
      }
    }
  },
  {
    "id": 102462,
    "name": "findprevprime",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/findprevprime",
    "attrs": {
      "baseSkills": {
        "prog": 35
      }
    }
  },
  {
    "id": 102439,
    "name": "firstword",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/firstword",
    "attrs": {
      "baseSkills": {
        "prog": 20
      }
    }
  },
  {
    "id": 102480,
    "name": "fishandchips",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/fishandchips",
    "attrs": {
      "baseSkills": {
        "prog": 20
      }
    }
  },
  {
    "id": 102453,
    "name": "fprime",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/fprime",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 102476,
    "name": "fromto",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/fromto",
    "attrs": {
      "baseSkills": {
        "prog": 35
      }
    }
  },
  {
    "id": 102454,
    "name": "gcd",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/gcd",
    "attrs": {
      "baseSkills": {
        "prog": 20
      }
    }
  },
  {
    "id": 102464,
    "name": "grouping",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/grouping",
    "attrs": {
      "baseSkills": {
        "prog": 100
      }
    }
  },
  {
    "id": 102484,
    "name": "hashcode",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/hashcode",
    "attrs": {
      "baseSkills": {
        "prog": 20
      }
    }
  },
  {
    "id": 102444,
    "name": "hiddenp",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/hiddenp",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 102457,
    "name": "inter",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/inter",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 102485,
    "name": "iscapitalized",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/iscapitalized",
    "attrs": {
      "baseSkills": {
        "prog": 35
      }
    }
  },
  {
    "id": 102436,
    "name": "itoa",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/itoa",
    "attrs": {
      "baseSkills": {
        "prog": 35
      }
    }
  },
  {
    "id": 102437,
    "name": "itoabase",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/itoabase",
    "attrs": {
      "baseSkills": {
        "prog": 85
      }
    }
  },
  {
    "id": 102456,
    "name": "lastword",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/lastword",
    "attrs": {
      "baseSkills": {
        "prog": 20
      }
    }
  },
  {
    "id": 102474,
    "name": "notdecimal",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/notdecimal",
    "attrs": {
      "baseSkills": {
        "prog": 65
      }
    }
  },
  {
    "id": 102490,
    "name": "only1",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/only1",
    "attrs": {
      "baseSkills": {
        "prog": 5
      }
    }
  },
  {
    "id": 102440,
    "name": "onlya",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/onlya",
    "attrs": {
      "baseSkills": {
        "prog": 5
      }
    }
  },
  {
    "id": 102489,
    "name": "onlyb",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/onlyb",
    "attrs": {
      "baseSkills": {
        "prog": 5
      }
    }
  },
  {
    "id": 102488,
    "name": "onlyf",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/onlyf",
    "attrs": {
      "baseSkills": {
        "prog": 5
      }
    }
  },
  {
    "id": 102441,
    "name": "onlyz",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/onlyz",
    "attrs": {
      "baseSkills": {
        "prog": 5
      }
    }
  },
  {
    "id": 102458,
    "name": "options",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/options",
    "attrs": {
      "baseSkills": {
        "prog": 85
      }
    }
  },
  {
    "id": 102460,
    "name": "piglatin",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/piglatin",
    "attrs": {
      "baseSkills": {
        "prog": 85
      }
    }
  },
  {
    "id": 102491,
    "name": "printif",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/printif",
    "attrs": {
      "baseSkills": {
        "prog": 10
      }
    }
  },
  {
    "id": 102492,
    "name": "printifnot",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/printifnot",
    "attrs": {
      "baseSkills": {
        "prog": 10
      }
    }
  },
  {
    "id": 102467,
    "name": "printmemory",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/printmemory",
    "attrs": {
      "baseSkills": {
        "prog": 35
      }
    }
  },
  {
    "id": 102461,
    "name": "printrevcomb",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/printrevcomb",
    "attrs": {
      "baseSkills": {
        "prog": 35
      }
    }
  },
  {
    "id": 102470,
    "name": "rectperimeter",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/rectperimeter",
    "attrs": {
      "baseSkills": {
        "prog": 10
      }
    }
  },
  {
    "id": 102438,
    "name": "repeatalpha",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/repeatalpha",
    "attrs": {
      "baseSkills": {
        "prog": 20
      }
    }
  },
  {
    "id": 102475,
    "name": "retainfirsthalf",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/retainfirsthalf",
    "attrs": {
      "baseSkills": {
        "prog": 10
      }
    }
  },
  {
    "id": 102482,
    "name": "revconcatalternate",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/revconcatalternate",
    "attrs": {
      "baseSkills": {
        "prog": 65
      }
    }
  },
  {
    "id": 102443,
    "name": "reversestrcap",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/reversestrcap",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 102447,
    "name": "revwstr",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/revwstr",
    "attrs": {
      "baseSkills": {
        "prog": 75
      }
    }
  },
  {
    "id": 102463,
    "name": "romannumbers",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/romannumbers",
    "attrs": {
      "baseSkills": {
        "prog": 85
      }
    }
  },
  {
    "id": 102446,
    "name": "rostring",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/rostring",
    "attrs": {
      "baseSkills": {
        "prog": 75
      }
    }
  },
  {
    "id": 102448,
    "name": "rpncalc",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/rpncalc",
    "attrs": {
      "baseSkills": {
        "prog": 95
      }
    }
  },
  {
    "id": 102479,
    "name": "saveandmiss",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/saveandmiss",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 102445,
    "name": "searchreplace",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/searchreplace",
    "attrs": {
      "baseSkills": {
        "prog": 20
      }
    }
  },
  {
    "id": 102486,
    "name": "thirdtimeisacharm",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/thirdtimeisacharm",
    "attrs": {
      "baseSkills": {
        "prog": 35
      }
    }
  },
  {
    "id": 102459,
    "name": "union",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/union",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 102455,
    "name": "wdmatch",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/wdmatch",
    "attrs": {
      "baseSkills": {
        "prog": 50
      }
    }
  },
  {
    "id": 102472,
    "name": "weareunique",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/weareunique",
    "attrs": {
      "baseSkills": {
        "prog": 35
      }
    }
  },
  {
    "id": 102477,
    "name": "wordflip",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/wordflip",
    "attrs": {
      "baseSkills": {
        "prog": 75
      }
    }
  },
  {
    "id": 102469,
    "name": "zipstring",
    "type": "exercise",
    "path": "/astanahub/module/checkpoint-zero/zipstring",
    "attrs": {
      "baseSkills": {
        "prog": 35
      }
    }
  },
  {
    "id": 102614,
    "name": "chess",
    "type": "project",
    "path": "/astanahub/module/chess",
    "attrs": {
      "baseSkills": {
        "mobile": 55
      }
    }
  },
  {
    "id": 102620,
    "name": "cloud-design",
    "type": "project",
    "path": "/astanahub/module/cloud-design",
    "attrs": {
      "baseSkills": {
        "docker": 60,
        "sys-admin": 35
      }
    }
  },
  {
    "id": 102621,
    "name": "code-keeper",
    "type": "project",
    "path": "/astanahub/module/code-keeper",
    "attrs": {
      "baseSkills": {
        "docker": 60,
        "sys-admin": 35
      }
    }
  },
  {
    "id": 102084,
    "name": "ascii-art-color",
    "type": "project",
    "path": "/astanahub/module/color",
    "attrs": {
      "baseSkills": {
        "go": 27
      }
    }
  },
  {
    "id": 102432,
    "name": "connect",
    "type": "project",
    "path": "/astanahub/module/connect",
    "attrs": {
      "baseSkills": {
        "tcp": 10
      }
    }
  },
  {
    "id": 102112,
    "name": "corewar",
    "type": "project",
    "path": "/astanahub/module/corewar",
    "attrs": {
      "baseSkills": {
        "ai": 25,
        "algo": 65,
        "game": 35
      }
    }
  },
  {
    "id": 102519,
    "name": "credit-scoring",
    "type": "project",
    "path": "/astanahub/module/credit-scoring",
    "attrs": {
      "baseSkills": {
        "ai": 80
      }
    }
  },
  {
    "id": 102120,
    "name": "social-network-cross-platform-appimage",
    "type": "project",
    "path": "/astanahub/module/cross-platform-appimage",
    "attrs": {
      "baseSkills": {
        "electron": 40,
        "sys-admin": 15
      }
    }
  },
  {
    "id": 102617,
    "name": "crud-master",
    "type": "project",
    "path": "/astanahub/module/crud-master",
    "attrs": {
      "baseSkills": {
        "js": 45,
        "sys-admin": 35
      }
    }
  },
  {
    "id": 102616,
    "name": "deep-in-net",
    "type": "project",
    "path": "/astanahub/module/deep-in-net",
    "attrs": {
      "baseSkills": {
        "sys-admin": 30
      }
    }
  },
  {
    "id": 102615,
    "name": "deep-in-system",
    "type": "project",
    "path": "/astanahub/module/deep-in-system",
    "attrs": {
      "baseSkills": {
        "sys-admin": 45
      }
    }
  },
  {
    "id": 102118,
    "name": "make-your-game-different-maps",
    "type": "project",
    "path": "/astanahub/module/different-maps",
    "attrs": {
      "baseSkills": {
        "algo": 38,
        "game": 15
      }
    }
  },
  {
    "id": 102092,
    "name": "ascii-art-web-dockerize",
    "type": "project",
    "path": "/astanahub/module/dockerize",
    "attrs": {
      "baseSkills": {
        "docker": 10,
        "back-end": 15
      }
    }
  },
  {
    "id": 103087,
    "name": "document-categorization",
    "type": "project",
    "path": "/astanahub/module/document-categorization",
    "attrs": {
      "baseSkills": {
        "ai": 70
      }
    }
  },
  {
    "id": 103081,
    "name": "edu-predict",
    "type": "project",
    "path": "/astanahub/module/edu-predict",
    "attrs": {
      "baseSkills": {
        "ai": 55
      }
    }
  },
  {
    "id": 102517,
    "name": "emotions-detector",
    "type": "project",
    "path": "/astanahub/module/emotions-detector",
    "attrs": {
      "baseSkills": {
        "ai": 60
      }
    }
  },
  {
    "id": 102610,
    "name": "evasion",
    "type": "project",
    "path": "/astanahub/module/evasion",
    "attrs": {
      "baseSkills": {
        "unix": 69
      }
    }
  },
  {
    "id": 102093,
    "name": "ascii-art-web-export-file",
    "type": "project",
    "path": "/astanahub/module/exportfile",
    "attrs": {
      "baseSkills": {
        "back-end": 20
      }
    }
  },
  {
    "id": 102102,
    "name": "filler",
    "type": "project",
    "path": "/astanahub/module/filler",
    "attrs": {
      "baseSkills": {
        "ai": 20,
        "algo": 40,
        "game": 28,
        "rust": 40
      }
    }
  },
  {
    "id": 102097,
    "name": "groupie-tracker-filters",
    "type": "project",
    "path": "/astanahub/module/filters",
    "attrs": {
      "baseSkills": {
        "go": 36,
        "front-end": 30
      }
    }
  },
  {
    "id": 102573,
    "name": "financial-instruments",
    "type": "project",
    "path": "/astanahub/module/financial-instruments",
    "attrs": {
      "baseSkills": {
        "blockchain": 80
      }
    }
  },
  {
    "id": 102409,
    "name": "firing-range",
    "type": "project",
    "path": "/astanahub/module/firing-range",
    "attrs": {
      "baseSkills": {
        "game": 30
      }
    }
  },
  {
    "id": 102075,
    "name": "forum",
    "type": "project",
    "path": "/astanahub/module/forum",
    "attrs": {
      "baseSkills": {
        "go": 45,
        "sql": 25,
        "html": 35,
        "docker": 15,
        "back-end": 35,
        "front-end": 40,
        "sys-admin": 5
      }
    }
  },
  {
    "id": 102086,
    "name": "ascii-art-fs",
    "type": "project",
    "path": "/astanahub/module/fs",
    "attrs": {
      "baseSkills": {
        "go": 26
      }
    }
  },
  {
    "id": 102098,
    "name": "groupie-tracker-geolocalization",
    "type": "project",
    "path": "/astanahub/module/geolocalization",
    "attrs": {
      "baseSkills": {
        "back-end": 15
      }
    }
  },
  {
    "id": 102637,
    "name": "get-a-room",
    "type": "project",
    "path": "/astanahub/module/get-a-room",
    "attrs": {
      "baseSkills": {
        "ux": 60
      }
    }
  },
  {
    "id": 102773,
    "name": "git",
    "type": "project",
    "path": "/astanahub/module/git",
    "attrs": {
      "baseSkills": {
        "git": 50
      }
    }
  },
  {
    "id": 102081,
    "name": "go-reloaded",
    "type": "project",
    "path": "/astanahub/module/go-reloaded",
    "attrs": {
      "baseSkills": {
        "go": 20,
        "algo": 15
      }
    }
  },
  {
    "id": 102247,
    "name": "graphql",
    "type": "project",
    "path": "/astanahub/module/graphql",
    "attrs": {
      "baseSkills": {
        "graphql": 20,
        "front-end": 48
      }
    }
  },
  {
    "id": 102096,
    "name": "groupie-tracker",
    "type": "project",
    "path": "/astanahub/module/groupie-tracker",
    "attrs": {
      "baseSkills": {
        "go": 35,
        "html": 25,
        "back-end": 10,
        "front-end": 25
      }
    }
  },
  {
    "id": 102426,
    "name": "guess-it-1",
    "type": "project",
    "path": "/astanahub/module/guess-it-1",
    "attrs": {
      "baseSkills": {
        "ai": 5,
        "algo": 25
      }
    }
  },
  {
    "id": 102428,
    "name": "guess-it-2",
    "type": "project",
    "path": "/astanahub/module/guess-it-2",
    "attrs": {
      "baseSkills": {
        "ai": 10,
        "algo": 35
      }
    }
  },
  {
    "id": 102117,
    "name": "make-your-game-history",
    "type": "project",
    "path": "/astanahub/module/history",
    "attrs": {
      "baseSkills": {
        "game": 12
      }
    }
  },
  {
    "id": 102608,
    "name": "hole-in-bin",
    "type": "project",
    "path": "/astanahub/module/hole-in-bin",
    "attrs": {
      "baseSkills": {
        "cybersecurity": 63
      }
    }
  },
  {
    "id": 102077,
    "name": "forum-image-upload",
    "type": "project",
    "path": "/astanahub/module/image-upload",
    "attrs": {
      "baseSkills": {
        "go": 47,
        "html": 35,
        "back-end": 40,
        "front-end": 42
      }
    }
  },
  {
    "id": 102607,
    "name": "injector",
    "type": "project",
    "path": "/astanahub/module/injector",
    "attrs": {
      "baseSkills": {
        "cybersecurity": 53
      }
    }
  },
  {
    "id": 103085,
    "name": "inspect-vision",
    "type": "project",
    "path": "/astanahub/module/inspect-vision",
    "attrs": {
      "baseSkills": {
        "ai": 95
      }
    }
  },
  {
    "id": 102603,
    "name": "inspector-image",
    "type": "project",
    "path": "/astanahub/module/inspector-image",
    "attrs": {
      "baseSkills": {
        "cybersecurity": 33
      }
    }
  },
  {
    "id": 102121,
    "name": "job-control",
    "type": "project",
    "path": "/astanahub/module/job-control",
    "attrs": {
      "baseSkills": {
        "sh": 25,
        "unix": 40
      }
    }
  },
  {
    "id": 102418,
    "name": "jumpo",
    "type": "project",
    "path": "/astanahub/module/jumpo",
    "attrs": {
      "baseSkills": {
        "game": 80
      }
    }
  },
  {
    "id": 102087,
    "name": "ascii-art-justify",
    "type": "project",
    "path": "/astanahub/module/justify",
    "attrs": {
      "baseSkills": {
        "go": 29
      }
    }
  },
  {
    "id": 102515,
    "name": "kaggle-titanic",
    "type": "project",
    "path": "/astanahub/module/kaggle-titanic",
    "attrs": {
      "baseSkills": {
        "ai": 40
      }
    }
  },
  {
    "id": 103075,
    "name": "kaggle-titanic",
    "type": "project",
    "path": "/astanahub/module/kaggle-titanic-ai",
    "attrs": {
      "baseSkills": {
        "ai": 25
      }
    }
  },
  {
    "id": 102600,
    "name": "kaquiz",
    "type": "project",
    "path": "/astanahub/module/kaquiz",
    "attrs": {
      "baseSkills": {
        "mobile": 64
      }
    }
  },
  {
    "id": 102101,
    "name": "lem-in",
    "type": "project",
    "path": "/astanahub/module/lem-in",
    "attrs": {
      "baseSkills": {
        "go": 40,
        "algo": 35
      }
    }
  },
  {
    "id": 102638,
    "name": "lets-do-some-sports",
    "type": "project",
    "path": "/astanahub/module/lets-do-some-sports",
    "attrs": {
      "baseSkills": {
        "ux": 65
      }
    }
  },
  {
    "id": 102639,
    "name": "lets-fair-trade",
    "type": "project",
    "path": "/astanahub/module/lets-fair-trade",
    "attrs": {
      "baseSkills": {
        "ux": 70
      }
    }
  },
  {
    "id": 102763,
    "name": "lets-play",
    "type": "project",
    "path": "/astanahub/module/lets-play",
    "attrs": {
      "baseSkills": {
        "java": 35,
        "no-sql": 10,
        "back-end": 55
      }
    }
  },
  {
    "id": 102772,
    "name": "lets-travel",
    "type": "project",
    "path": "/astanahub/module/lets-travel",
    "attrs": {
      "baseSkills": {
        "java": 70,
        "docker": 30,
        "no-sql": 80,
        "back-end": 80,
        "front-end": 80
      }
    }
  },
  {
    "id": 102427,
    "name": "linear-stats",
    "type": "project",
    "path": "/astanahub/module/linear-stats",
    "attrs": {
      "baseSkills": {
        "stats": 25
      }
    }
  },
  {
    "id": 102429,
    "name": "linux",
    "type": "project",
    "path": "/astanahub/module/linux",
    "attrs": {
      "baseSkills": {
        "unix": 10
      }
    }
  },
  {
    "id": 102605,
    "name": "local",
    "type": "project",
    "path": "/astanahub/module/local",
    "attrs": {
      "baseSkills": {
        "cybersecurity": 43
      }
    }
  },
  {
    "id": 102496,
    "name": "localhost",
    "type": "project",
    "path": "/astanahub/module/localhost",
    "attrs": {
      "baseSkills": {
        "tcp": 40,
        "algo": 58,
        "rust": 50,
        "back-end": 60,
        "sys-admin": 13
      }
    }
  },
  {
    "id": 102430,
    "name": "login",
    "type": "project",
    "path": "/astanahub/module/login",
    "attrs": {
      "baseSkills": {
        "unix": 25
      }
    }
  },
  {
    "id": 102103,
    "name": "make-your-game",
    "type": "project",
    "path": "/astanahub/module/make-your-game",
    "attrs": {
      "baseSkills": {
        "js": 35,
        "game": 10
      }
    }
  },
  {
    "id": 102609,
    "name": "mal-track",
    "type": "project",
    "path": "/astanahub/module/mal-track",
    "attrs": {
      "baseSkills": {
        "cybersecurity": 66
      }
    }
  },
  {
    "id": 102612,
    "name": "malware",
    "type": "project",
    "path": "/astanahub/module/malware",
    "attrs": {
      "baseSkills": {
        "cybersecurity": 80
      }
    }
  },
  {
    "id": 102425,
    "name": "math-skills",
    "type": "project",
    "path": "/astanahub/module/math-skills",
    "attrs": {
      "baseSkills": {
        "stats": 10
      }
    }
  },
  {
    "id": 103077,
    "name": "matrix-factorization",
    "type": "project",
    "path": "/astanahub/module/matrix-factorization",
    "attrs": {
      "baseSkills": {
        "ai": 35
      }
    }
  },
  {
    "id": 102107,
    "name": "mini-framework",
    "type": "project",
    "path": "/astanahub/module/mini-framework",
    "attrs": {
      "baseSkills": {
        "js": 50,
        "css": 40,
        "html": 55
      }
    }
  },
  {
    "id": 102422,
    "name": "mister-quiz",
    "type": "project",
    "path": "/astanahub/module/mister-quiz",
    "attrs": {
      "baseSkills": {
        "php": 35,
        "laravel": 30
      }
    }
  },
  {
    "id": 103084,
    "name": "ml-dev-ops",
    "type": "project",
    "path": "/astanahub/module/ml-dev-ops",
    "attrs": {
      "baseSkills": {
        "ai": 65
      }
    }
  },
  {
    "id": 102079,
    "name": "forum-moderation",
    "type": "project",
    "path": "/astanahub/module/moderation",
    "attrs": {
      "baseSkills": {
        "back-end": 42,
        "sys-admin": 10
      }
    }
  },
  {
    "id": 102415,
    "name": "mouse-vr",
    "type": "project",
    "path": "/astanahub/module/mouse-vr",
    "attrs": {
      "baseSkills": {
        "game": 63
      }
    }
  },
  {
    "id": 102766,
    "name": "mr-jenk",
    "type": "project",
    "path": "/astanahub/module/mr-jenk",
    "attrs": {
      "baseSkills": {
        "docker": 25
      }
    }
  },
  {
    "id": 102114,
    "name": "multiplayer-fps",
    "type": "project",
    "path": "/astanahub/module/multiplayer-fps",
    "attrs": {
      "baseSkills": {
        "ai": 22,
        "game": 32,
        "rust": 55
      }
    }
  },
  {
    "id": 102094,
    "name": "my-ls-1",
    "type": "project",
    "path": "/astanahub/module/my-ls-1",
    "attrs": {
      "baseSkills": {
        "go": 30,
        "unix": 15
      }
    }
  },
  {
    "id": 102414,
    "name": "nascar-online-alpha",
    "type": "project",
    "path": "/astanahub/module/nascar-online-alpha",
    "attrs": {
      "baseSkills": {
        "game": 57
      }
    }
  },
  {
    "id": 102770,
    "name": "neo4flix",
    "type": "project",
    "path": "/astanahub/module/neo-4-flix",
    "attrs": {
      "baseSkills": {
        "java": 55,
        "no-sql": 45,
        "back-end": 65,
        "front-end": 40
      }
    }
  },
  {
    "id": 102095,
    "name": "net-cat",
    "type": "project",
    "path": "/astanahub/module/net-cat",
    "attrs": {
      "baseSkills": {
        "go": 35,
        "tcp": 30,
        "unix": 15
      }
    }
  },
  {
    "id": 102421,
    "name": "netfix",
    "type": "project",
    "path": "/astanahub/module/netfix",
    "attrs": {
      "baseSkills": {
        "django": 30,
        "python": 30,
        "back-end": 20,
        "front-end": 20
      }
    }
  },
  {
    "id": 102769,
    "name": "nexus",
    "type": "project",
    "path": "/astanahub/module/nexus",
    "attrs": {
      "baseSkills": {
        "docker": 26
      }
    }
  },
  {
    "id": 102570,
    "name": "nft-marketplace",
    "type": "project",
    "path": "/astanahub/module/nft-marketplace",
    "attrs": {
      "baseSkills": {
        "blockchain": 42
      }
    }
  },
  {
    "id": 102516,
    "name": "nlp-scraper",
    "type": "project",
    "path": "/astanahub/module/nlp-scraper",
    "attrs": {
      "baseSkills": {
        "ai": 50
      }
    }
  },
  {
    "id": 102572,
    "name": "node-dashboard",
    "type": "project",
    "path": "/astanahub/module/node-dashboard",
    "attrs": {
      "baseSkills": {
        "blockchain": 67
      }
    }
  },
  {
    "id": 102611,
    "name": "obfuscator",
    "type": "project",
    "path": "/astanahub/module/obfuscator",
    "attrs": {
      "baseSkills": {
        "unix": 72
      }
    }
  },
  {
    "id": 102619,
    "name": "orchestrator",
    "type": "project",
    "path": "/astanahub/module/orchestrator",
    "attrs": {
      "baseSkills": {
        "docker": 70
      }
    }
  },
  {
    "id": 102085,
    "name": "ascii-art-output",
    "type": "project",
    "path": "/astanahub/module/output",
    "attrs": {
      "baseSkills": {
        "go": 28
      }
    }
  },
  {
    "id": 102602,
    "name": "passive",
    "type": "project",
    "path": "/astanahub/module/passive",
    "attrs": {
      "baseSkills": {
        "cybersecurity": 30
      }
    }
  },
  {
    "id": 102571,
    "name": "payment-channel",
    "type": "project",
    "path": "/astanahub/module/payment-channel",
    "attrs": {
      "baseSkills": {
        "blockchain": 55
      }
    }
  },
  {
    "id": 103057,
    "name": "Piscine AI",
    "type": "piscine",
    "path": "/astanahub/module/piscine-ai",
    "attrs": {
      "baseSkills": {
        "ai": 20
      },
      "ranksDefinitions": [
        {
          "name": "",
          "level": 127
        }
      ]
    }
  },
  {
    "id": 106257,
    "name": "Piscine AI 1",
    "type": "piscine",
    "path": "/astanahub/module/piscine-ai-1",
    "attrs": {
      "baseSkills": {
        "python": 15
      },
      "ranksDefinitions": [
        {
          "name": "",
          "level": 127
        }
      ]
    }
  },
  {
    "id": 106309,
    "name": "applied-linalg",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-1/applied-linalg",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106440,
    "name": "checkout-experiment-analysis",
    "type": "raid",
    "path": "/astanahub/module/piscine-ai-1/checkout-experiment-analysis",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106438,
    "name": "clean-orders",
    "type": "raid",
    "path": "/astanahub/module/piscine-ai-1/clean-orders",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106297,
    "name": "data-structures",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-1/data-structures",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106311,
    "name": "descriptive-stats",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-1/descriptive-stats",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106312,
    "name": "distributions",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-1/distributions",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106299,
    "name": "file-io",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-1/file-io",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106302,
    "name": "functional-python",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-1/functional-python",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106303,
    "name": "git",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-1/git",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106313,
    "name": "hypothesis-testing",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-1/hypothesis-testing",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106308,
    "name": "linear-algebra",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-1/linear-algebra",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106310,
    "name": "linreg-scratch",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-1/linreg-scratch",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106300,
    "name": "modules",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-1/modules",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106306,
    "name": "numpy-arrays",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-1/numpy-arrays",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106307,
    "name": "numpy-operations",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-1/numpy-operations",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106298,
    "name": "OOP",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-1/oop",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106314,
    "name": "probability",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-1/probability",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106276,
    "name": "python-basics",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-1/python-basics",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106305,
    "name": "regex",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-1/regex",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106437,
    "name": "ridership-cli",
    "type": "raid",
    "path": "/astanahub/module/piscine-ai-1/ridership-cli",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106315,
    "name": "statistical-eda",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-1/statistical-eda",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106301,
    "name": "testing",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-1/testing",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106304,
    "name": "tooling",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-1/tooling",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106439,
    "name": "wine-pca-analysis",
    "type": "raid",
    "path": "/astanahub/module/piscine-ai-1/wine-pca-analysis",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106334,
    "name": "Piscine AI 2",
    "type": "piscine",
    "path": "/astanahub/module/piscine-ai-2",
    "attrs": {
      "baseSkills": {
        "ai": 10,
        "python": 20
      },
      "ranksDefinitions": [
        {
          "name": "",
          "level": 127
        }
      ]
    }
  },
  {
    "id": 106386,
    "name": "num-feature-engineering",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-2/categorical-feature-engineering",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106376,
    "name": "data-cleaning",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-2/data-cleaning",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106372,
    "name": "dataframes",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-2/dataframes",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106380,
    "name": "eda",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-2/eda",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106373,
    "name": "filtering-sorting",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-2/filtering-sorting",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106381,
    "name": "financial-eda",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-2/financial-eda",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106374,
    "name": "groupby",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-2/groupby",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106375,
    "name": "joining",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-2/joining",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106382,
    "name": "linear-reg",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-2/linear-reg",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106383,
    "name": "logistic-reg",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-2/logistic-reg",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106377,
    "name": "matplotlib",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-2/matplotlib",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106391,
    "name": "ml-debugging",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-2/ml-debugging",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106390,
    "name": "model-persistence",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-2/model-persistence",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106389,
    "name": "model-selection",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-2/model-selection",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106385,
    "name": "num-feature-engineering",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-2/num-feature-engineering",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106388,
    "name": "pipelines",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-2/pipelines",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106378,
    "name": "seaborn",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-2/seaborn",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106384,
    "name": "tree-models",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-2/tree-models",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106387,
    "name": "trees-ensembles",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-2/trees-ensembles",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106379,
    "name": "visualization",
    "type": "project",
    "path": "/astanahub/module/piscine-ai-2/visualization",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 106431,
    "name": "Piscine AI 3",
    "type": "piscine",
    "path": "/astanahub/module/piscine-ai-3",
    "attrs": {
      "baseSkills": {
        "ai": 20,
        "python": 25
      },
      "ranksDefinitions": [
        {
          "name": "",
          "level": 127
        }
      ]
    }
  },
  {
    "id": 103066,
    "name": "classification",
    "type": "project",
    "path": "/astanahub/module/piscine-ai/classification",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 103063,
    "name": "data-wrangling",
    "type": "project",
    "path": "/astanahub/module/piscine-ai/data-wrangling",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 103071,
    "name": "keras",
    "type": "project",
    "path": "/astanahub/module/piscine-ai/keras",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 103072,
    "name": "keras-2",
    "type": "project",
    "path": "/astanahub/module/piscine-ai/keras-2",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 103065,
    "name": "linear-regression",
    "type": "project",
    "path": "/astanahub/module/piscine-ai/linear-regression",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 103069,
    "name": "model-selection",
    "type": "project",
    "path": "/astanahub/module/piscine-ai/model-selection",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 103070,
    "name": "neural-networks",
    "type": "project",
    "path": "/astanahub/module/piscine-ai/neural-networks",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 103073,
    "name": "nlp",
    "type": "project",
    "path": "/astanahub/module/piscine-ai/nlp",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 103074,
    "name": "nlp-spacy",
    "type": "project",
    "path": "/astanahub/module/piscine-ai/nlp-spacy",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 103060,
    "name": "numpy",
    "type": "project",
    "path": "/astanahub/module/piscine-ai/numpy",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 103061,
    "name": "pandas",
    "type": "project",
    "path": "/astanahub/module/piscine-ai/pandas",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 103067,
    "name": "pipeline",
    "type": "project",
    "path": "/astanahub/module/piscine-ai/pipeline",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 103064,
    "name": "time-series",
    "type": "project",
    "path": "/astanahub/module/piscine-ai/time-series",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 103068,
    "name": "training",
    "type": "project",
    "path": "/astanahub/module/piscine-ai/training",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 103062,
    "name": "visualizations",
    "type": "project",
    "path": "/astanahub/module/piscine-ai/visualizations",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 102520,
    "name": "Piscine Blockchain",
    "type": "piscine",
    "path": "/astanahub/module/piscine-blockchain",
    "attrs": {
      "baseSkills": {
        "blockchain": 30
      }
    }
  },
  {
    "id": 102574,
    "name": "Piscine Flutter",
    "type": "piscine",
    "path": "/astanahub/module/piscine-flutter",
    "attrs": {
      "baseSkills": {
        "mobile": 30
      }
    }
  },
  {
    "id": 102640,
    "name": "Piscine Java",
    "type": "piscine",
    "path": "/astanahub/module/piscine-java",
    "attrs": {
      "baseSkills": {
        "java": 30
      }
    }
  },
  {
    "id": 102123,
    "name": "Piscine JS",
    "type": "piscine",
    "path": "/astanahub/module/piscine-js",
    "attrs": {
      "baseSkills": {
        "js": 35
      }
    }
  },
  {
    "id": 102221,
    "name": "clonernews",
    "type": "raid",
    "path": "/astanahub/module/piscine-js/clonernews",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 102196,
    "name": "sortable",
    "type": "raid",
    "path": "/astanahub/module/piscine-js/sortable",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 102248,
    "name": "Piscine Rust",
    "type": "piscine",
    "path": "/astanahub/module/piscine-rust",
    "attrs": {
      "baseSkills": {
        "rust": 30
      }
    }
  },
  {
    "id": 102630,
    "name": "piscine-ui",
    "type": "piscine",
    "path": "/astanahub/module/piscine-ui",
    "attrs": {
      "baseSkills": {
        "ux": 45
      }
    }
  },
  {
    "id": 102622,
    "name": "piscine-ux",
    "type": "piscine",
    "path": "/astanahub/module/piscine-ux",
    "attrs": {
      "baseSkills": {
        "ux": 35
      }
    }
  },
  {
    "id": 102618,
    "name": "play-with-containers",
    "type": "project",
    "path": "/astanahub/module/play-with-containers",
    "attrs": {
      "baseSkills": {
        "docker": 65
      }
    }
  },
  {
    "id": 102089,
    "name": "push-swap",
    "type": "project",
    "path": "/astanahub/module/push-swap",
    "attrs": {
      "baseSkills": {
        "go": 30,
        "algo": 35
      }
    }
  },
  {
    "id": 102104,
    "name": "real-time-forum",
    "type": "project",
    "path": "/astanahub/module/real-time-forum",
    "attrs": {
      "baseSkills": {
        "go": 52,
        "js": 40,
        "back-end": 40,
        "front-end": 45
      }
    }
  },
  {
    "id": 102433,
    "name": "remote",
    "type": "project",
    "path": "/astanahub/module/remote",
    "attrs": {
      "baseSkills": {
        "tcp": 20
      }
    }
  },
  {
    "id": 102088,
    "name": "ascii-art-reverse",
    "type": "project",
    "path": "/astanahub/module/reverse",
    "attrs": {
      "baseSkills": {
        "go": 30
      }
    }
  },
  {
    "id": 102110,
    "name": "rt",
    "type": "project",
    "path": "/astanahub/module/rt",
    "attrs": {
      "baseSkills": {
        "algo": 55,
        "rust": 45
      }
    }
  },
  {
    "id": 102434,
    "name": "scan",
    "type": "project",
    "path": "/astanahub/module/scan",
    "attrs": {
      "baseSkills": {
        "tcp": 30,
        "sys-admin": 20
      }
    }
  },
  {
    "id": 102116,
    "name": "make-your-game-score-handling",
    "type": "project",
    "path": "/astanahub/module/score-handling",
    "attrs": {
      "baseSkills": {
        "game": 18,
        "back-end": 40
      }
    }
  },
  {
    "id": 102122,
    "name": "scripting",
    "type": "project",
    "path": "/astanahub/module/scripting",
    "attrs": {
      "baseSkills": {
        "sh": 35,
        "unix": 45
      }
    }
  },
  {
    "id": 102100,
    "name": "groupie-tracker-search-bar",
    "type": "project",
    "path": "/astanahub/module/search-bar",
    "attrs": {
      "baseSkills": {
        "go": 38,
        "back-end": 10
      }
    }
  },
  {
    "id": 102601,
    "name": "secure-messenger",
    "type": "project",
    "path": "/astanahub/module/secure-messenger",
    "attrs": {
      "baseSkills": {
        "mobile": 80
      }
    }
  },
  {
    "id": 102078,
    "name": "forum-security",
    "type": "project",
    "path": "/astanahub/module/security",
    "attrs": {
      "baseSkills": {
        "go": 49,
        "back-end": 47,
        "sys-admin": 15
      }
    }
  },
  {
    "id": 102423,
    "name": "shop",
    "type": "project",
    "path": "/astanahub/module/shop",
    "attrs": {
      "baseSkills": {
        "ruby": 25,
        "rails": 25,
        "front-end": 20
      }
    }
  },
  {
    "id": 102598,
    "name": "sky-map",
    "type": "project",
    "path": "/astanahub/module/sky-map",
    "attrs": {
      "baseSkills": {
        "mobile": 46
      }
    }
  },
  {
    "id": 102420,
    "name": "smart-road",
    "type": "project",
    "path": "/astanahub/module/smart-road",
    "attrs": {
      "baseSkills": {
        "ai": 15,
        "game": 23,
        "rust": 35
      }
    }
  },
  {
    "id": 102106,
    "name": "social-network",
    "type": "project",
    "path": "/astanahub/module/social-network",
    "attrs": {
      "baseSkills": {
        "go": 55,
        "js": 45,
        "css": 35,
        "sql": 30,
        "html": 50,
        "docker": 25,
        "back-end": 55,
        "front-end": 55,
        "sys-admin": 10
      }
    }
  },
  {
    "id": 102518,
    "name": "sp500-strategies",
    "type": "project",
    "path": "/astanahub/module/sp500-strategies",
    "attrs": {
      "baseSkills": {
        "ai": 70
      }
    }
  },
  {
    "id": 103086,
    "name": "spectral-learning",
    "type": "project",
    "path": "/astanahub/module/spectral-learning",
    "attrs": {
      "baseSkills": {
        "ai": 80
      }
    }
  },
  {
    "id": 102417,
    "name": "stealth-boom",
    "type": "project",
    "path": "/astanahub/module/stealth-boom",
    "attrs": {
      "baseSkills": {
        "game": 75
      }
    }
  },
  {
    "id": 102105,
    "name": "stock-exchange-sim",
    "type": "project",
    "path": "/astanahub/module/stock-exchange-sim",
    "attrs": {
      "baseSkills": {
        "algo": 40
      }
    }
  },
  {
    "id": 102599,
    "name": "stock-market",
    "type": "project",
    "path": "/astanahub/module/stock-market",
    "attrs": {
      "baseSkills": {
        "mobile": 72
      }
    }
  },
  {
    "id": 102091,
    "name": "ascii-art-web-stylize",
    "type": "project",
    "path": "/astanahub/module/stylize",
    "attrs": {
      "baseSkills": {
        "css": 10,
        "html": 15,
        "front-end": 20
      }
    }
  },
  {
    "id": 102424,
    "name": "system-monitor",
    "type": "project",
    "path": "/astanahub/module/system-monitor",
    "attrs": {
      "baseSkills": {
        "c-pp": 20,
        "unix": 15
      }
    }
  },
  {
    "id": 102082,
    "name": "tetris-optimizer",
    "type": "project",
    "path": "/astanahub/module/tetris-optimizer",
    "attrs": {
      "baseSkills": {
        "go": 30,
        "algo": 35
      }
    }
  },
  {
    "id": 102416,
    "name": "the-pages",
    "type": "project",
    "path": "/astanahub/module/the-pages",
    "attrs": {
      "baseSkills": {
        "game": 68
      }
    }
  },
  {
    "id": 102771,
    "name": "travel-plan",
    "type": "project",
    "path": "/astanahub/module/travel-plan",
    "attrs": {
      "baseSkills": {
        "sql": 40,
        "java": 60,
        "docker": 28,
        "no-sql": 50,
        "back-end": 70,
        "front-end": 70
      }
    }
  },
  {
    "id": 102613,
    "name": "twenty-forty-eight",
    "type": "project",
    "path": "/astanahub/module/twenty-forty-eight",
    "attrs": {
      "baseSkills": {
        "mobile": 38
      }
    }
  },
  {
    "id": 102119,
    "name": "real-time-forum-typing-in-progress",
    "type": "project",
    "path": "/astanahub/module/typing-in-progress",
    "attrs": {
      "baseSkills": {
        "go": 55,
        "back-end": 50
      }
    }
  },
  {
    "id": 102412,
    "name": "vehicle-physics",
    "type": "project",
    "path": "/astanahub/module/vehicle-physics",
    "attrs": {
      "baseSkills": {
        "game": 46
      }
    }
  },
  {
    "id": 103079,
    "name": "vision-track",
    "type": "project",
    "path": "/astanahub/module/vision-track",
    "attrs": {
      "baseSkills": {
        "ai": 50
      }
    }
  },
  {
    "id": 103083,
    "name": "visual-scan",
    "type": "project",
    "path": "/astanahub/module/visual-scan",
    "attrs": {
      "baseSkills": {
        "ai": 75
      }
    }
  },
  {
    "id": 102099,
    "name": "groupie-tracker-visualizations",
    "type": "project",
    "path": "/astanahub/module/visualizations",
    "attrs": {
      "baseSkills": {
        "css": 15,
        "html": 27,
        "front-end": 35
      }
    }
  },
  {
    "id": 102606,
    "name": "web-hack",
    "type": "project",
    "path": "/astanahub/module/web-hack",
    "attrs": {
      "baseSkills": {
        "cybersecurity": 49
      }
    }
  },
  {
    "id": 102108,
    "name": "wget",
    "type": "project",
    "path": "/astanahub/module/wget",
    "attrs": {
      "baseSkills": {
        "unix": 20
      }
    }
  },
  {
    "id": 102410,
    "name": "widget-factory",
    "type": "project",
    "path": "/astanahub/module/widget-factory",
    "attrs": {
      "baseSkills": {
        "game": 35
      }
    }
  },
  {
    "id": 102111,
    "name": "zappy",
    "type": "project",
    "path": "/astanahub/module/zappy",
    "attrs": {
      "baseSkills": {
        "ai": 25,
        "tcp": 45,
        "algo": 65,
        "game": 35,
        "back-end": 75,
        "front-end": 60
      }
    }
  },
  {
    "id": 102413,
    "name": "zombie-ai",
    "type": "project",
    "path": "/astanahub/module/zombie-ai",
    "attrs": {
      "baseSkills": {
        "game": 52
      }
    }
  },
  {
    "id": 101397,
    "name": "quad",
    "type": "raid",
    "path": "/astanahub/piscinego/quad",
    "attrs": {
      "baseSkills": {}
    }
  },
  {
    "id": 101302,
    "name": "rot14",
    "type": "exercise",
    "path": "/astanahub/piscinego/quest-10/rot14",
    "attrs": {
      "baseSkills": {}
    }
  }
];
