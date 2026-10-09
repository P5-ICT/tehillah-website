// All the words and facts on the website live here, taken from the Tehillah brochure and
// the 2025 Community Safe Haven proposal (newer facts from the proposal win).
// To change the text on a page, change it here. Dates and news come from the backend instead.

export const site = {
  name: "Tehillah Community Collaborative",
  short: "Tehillah",
  tagline: "Embracing change since 1996",
  purpose:
    "Transforming communities and building a self-reliant society that can govern their own lives and families effectively.",
  motto: "A home for all, and a place where everybody is somebody.",
  npoNumber: "015-972 NPO",
  domain: "www.tehillah.za.org",
  contact: {
    address: "196 16th Avenue, Leonsdale, Elsies River, Cape Town, 7490",
    postal: "P.O. Box 28, Elsies River, 7490",
    phone: "021 933 0990",
    phoneHref: "tel:+27219330990",
    mobile: "072 302 9638",
    mobileHref: "tel:+27723029638",
    fax: "086 522 9264",
    // Set to null to hide the email address everywhere on the site.
    email: "tehillahcc@polka.co.za" as string | null,
    // Second contact: a person people can call or WhatsApp directly.
    person: {
      name: "Samantha Yorke",
      phone: "081 550 1015",
      phoneHref: "tel:+27815501015",
      whatsappHref: "https://wa.me/27815501015",
    },
    hours: "A social worker is available Monday to Thursday, 8am to 4pm.",
  },
};

export const nav = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Our Work" },
  { href: "/news", label: "News" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/contact", label: "Contact" },
];

export const stats = [
  { value: "147", label: "people employed through Tehillah Yadah" },
  { value: "80", label: "Home Base Carers visiting patients" },
  { value: "6,777", label: "home visits every month" },
  { value: "500–700", label: "people given soup every day" },
];

export type Section = {
  id: string;
  label: string;
  heading: string;
  paragraphs?: string[];
  points?: string[];
  // Leave the image out when we do not have a photo that truly shows this service.
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
};

export type Cluster = {
  slug: string;
  title: string;
  // Leave out when we have no published number for this cluster.
  beneficiaries?: string;
  summary: string;
  intro: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  sections: Section[];
};

export const clusters: Cluster[] = [
  {
    slug: "social-services",
    title: "Social Services",
    beneficiaries: "1,779",
    summary: "A safe haven, rehabilitation, daily meals and social work support for the people who need it most.",
    intro:
      "Social Services is our biggest cluster. It brings together a safe haven, a 24-hour care programme, a rehabilitation centre, a feeding scheme, support groups and social work.",
    image: "/images/house-of-magda.jpg",
    imageAlt: "The House of Magda safe haven building with its teal roof",
    sections: [
      {
        id: "house-of-magda",
        label: "SAFE HAVEN",
        heading: "House of Magda",
        paragraphs: [
          "House of Magda was the first project of Tehillah. About 20 years ago, many people in our community were too young for an old-age home, but too frail or vulnerable to live on their own or on the streets. We took over the abandoned Avonwood School building and turned it into a place of safety and care.",
          "Today we give 24-hour shelter, care and protection to about 150 residents who have been abandoned, neglected or left without family support. Referrals come from the Department of Social Development, the Department of Health, public hospitals, clinics, the South African Police Service, faith-based organisations and community members. Many residents have no family to care for them, and the facility is now full.",
        ],
        points: [
          "Safe accommodation, daily meals and personal care",
          "Medical monitoring and healthcare support",
          "Social work, and emotional and psychosocial support",
          "Family tracing and reunification where possible",
          "A team of professional nurses, social workers, caregivers, administrative staff and volunteers",
          "Emily Frail Care: two rooms for 10 frail women and 10 frail men, with a 24-hour nursing service",
          "Our own 24-hour access control keeps residents safe in an area affected by gangs",
        ],
        image: "/images/magda-rooms.jpg",
        imageAlt: "Two women sitting on beds in a room at House of Magda",
      },
      {
        id: "spread-your-wings",
        label: "REHABILITATION",
        heading: "Spread Your Wings",
        paragraphs: [
          "Our substance abuse rehabilitation centre has worked in this field for 13 years. We offer in-patient treatment, early intervention, aftercare and awareness programmes.",
          "We admit men and women aged 18 and over who struggle with drug and alcohol abuse and are willing to be rehabilitated. We also care for mothers with children. The centre has 35 bed spaces, a recreation room, consultation rooms, a dining room, a swimming pool and a garden.",
        ],
        points: [
          "In-patient: a 12-week programme modelled on the internationally recognised 12 Steps Program, supported by a senior social worker, a social auxiliary worker, a life skills specialist, a spiritual counsellor and co-ordinators",
          "After the programme we keep an open-door policy, and offer accommodation and a work opportunity within Tehillah",
          "All religions are welcome. Christianity is part of the spiritual side of the programme and we have our own church. Muslim clients can attend the nearest mosque",
          "Aftercare (the Matrix Programme): 16 weeks, twice a week from 10am to 1pm, with weekly drug tests, individual and group sessions, and random home visits to help families reunite",
          "Early intervention: we visit nearby schools twice a week for 6 weeks, including a family session, to warn children about the dangers of substance abuse and to help prevent suspensions and school drop-outs",
          "Awareness and prevention: every alternate Friday we take clients on a drive through the community, so that people hear first-hand how substance abuse destroys lives",
        ],
        image: "/images/rehab-meal.jpg",
        imageAlt: "Three men sharing a meal together at the rehabilitation centre",
        imagePosition: "50% 40%",
      },
      {
        id: "feeding-scheme",
        label: "FEEDING SCHEME",
        heading: "Soup for the community",
        paragraphs: [
          "For the past 20 years we have given out soup to 500 to 700 people a day. The ingredients are sponsored by the Dutch Reformed Church, and the project has never been funded by the government.",
          "We mainly serve mothers, children and people on TB treatment, ARVs and treatment for chronic disease.",
        ],
        points: [
          "Every alternate Wednesday we hold an “Hour of Power”, talking about parenting skills, domestic violence, teenage pregnancy, HIV/AIDS, substance abuse, early school drop-outs and family planning",
          "Our vegetable garden is funded by the Department of Agriculture",
          "The garden also helps our in-patient clients heal, and is used for outings for our crèche children and our mentally ill clients",
          "Fresh vegetables go to the crèche, the safe haven, the rehabilitation centre and clients living with HIV/AIDS",
        ],
        image: "/images/kitchen.jpg",
        imageAlt: "Two women preparing food in the Tehillah kitchen",
        imagePosition: "50% 35%",
      },
      {
        id: "social-work",
        label: "SOCIAL WORK",
        heading: "One Stop Holistic Social Work Service",
        paragraphs: [
          "Tehillah is the ear, eyes and mouthpiece of government, and a willing helping hand, in the heart of Elsies River. People can see a social worker every Monday to Thursday between 8am and 4pm.",
        ],
        points: [
          "A caseload of 230 to 300 people a month",
          "Help with domestic violence, substance abuse, homelessness and abandonment, abuse of the elderly, social grant abuse, dysfunctional families, children's behaviour, child maintenance and unemployment",
          "A social worker and a professional nursing sister are on call 24 hours a day",
        ],
        image: "/images/magda-courtyard.jpg",
        imageAlt: "The courtyard at House of Magda with residents outside",
      },
      {
        id: "care-and-support-groups",
        label: "CARE AND SUPPORT",
        heading: "24-hour care and support groups",
        paragraphs: [
          "Our 24-hour care programme supports frail older people who are homeless, too young for a place in an old-age home, or whose families cannot care for them properly. We believe everyone deserves to be treated with dignity and respect.",
          "We also run support groups, so that people facing the same challenges can meet, share and help each other through them.",
        ],
      },
    ],
  },
  {
    slug: "spiritual",
    title: "Spiritual",
    summary: "Tehillah Ministries Extreme Oasis: a welcoming church, a soup kitchen and a funeral scheme for the community.",
    intro:
      "Our Spiritual cluster is a welcoming space for everyone looking for spiritual guidance and support, at the heart of which is our church, Tehillah Ministries Extreme Oasis.",
    image: "/images/church.jpg",
    imageAlt: "A full congregation inside the Tehillah church hall",
    sections: [
      {
        id: "church",
        label: "CHURCH",
        heading: "Tehillah Ministries Extreme Oasis",
        paragraphs: [
          "Because of the hard social and economic situation here, we believe it matters that people are introduced to a Higher Power. Everyone is welcome to come, refresh and recover, and then go back to face their situations.",
          "People from the safe haven, the rehabilitation centre and the surrounding community attend, and our church welcomes people from all walks of life.",
        ],
        points: [
          "Offerings and items collected during services are shared with the less fortunate in the community",
          "An affordable Funeral Group Scheme",
          "A soup kitchen that feeds about 200 to 300 people a week",
          "A social worker is available Monday to Friday, 9am to 4pm",
        ],
        image: "/images/church.jpg",
        imageAlt: "A full congregation inside the Tehillah church hall",
      },
    ],
  },
  {
    slug: "skills-development",
    title: "Labour & Skills",
    summary: "Training and jobs that help people provide for themselves and their families.",
    intro:
      "Unemployment is one of the biggest problems in our community. Our Labour and Skills Development cluster trains people and creates work, so that they can become economic participants and support their families.",
    image: "/images/bakery.jpg",
    imageAlt: "Fresh bread on the racks at Mother K's Bakery",
    sections: [
      {
        id: "training",
        label: "TRAINING",
        heading: "Skills training",
        paragraphs: [
          "We run training programmes that give people the skills they need to find work. After training, many people are employed within Tehillah or placed in other local businesses and organisations. We also partner with local businesses to create jobs and grow the local economy.",
        ],
        points: ["Home-based carer training", "Gardening training", "Security training"],
      },
      {
        id: "tehillah-yadah",
        label: "WORK AND SKILLS",
        heading: "Tehillah Yadah: sustainable projects",
        paragraphs: [
          "Tehillah Yadah is a company that creates work, builds skills and helps both Tehillah and the community sustain themselves. Tehillah now provides work for 147 people.",
          "We want to bring the community to a point where people are not only waiting for hand-outs but are able to sustain themselves.",
        ],
        points: [
          "Mother K's Bakery and Coffee Shop",
          "Tehillah's Beauty Salon",
          "Tehillah's Sewing Group",
          "Tehillah's Access Control Company",
          "Tehillah's Gardening Project",
          "Tehillah's FM Community Radio Station",
        ],
        image: "/images/cafe.jpg",
        imageAlt: "The dining room at Mother K's Bakery and Coffee Shop",
      },
    ],
  },
  {
    slug: "education",
    title: "Education",
    beneficiaries: "145",
    summary: "Early childhood development at the Tehillah Future Kids crèche, caring for about 100 young children.",
    intro:
      "Education is where we invest in the youngest people in our community. We believe the most impact is made at this stage of a child's life.",
    image: "/images/children-reading.jpg",
    imageAlt: "Five children sitting together on a bench, one reading a book",
    sections: [
      {
        id: "early-childhood-development",
        label: "EARLY CHILDHOOD",
        heading: "Tehillah Future Kids crèche",
        paragraphs: [
          "The aim is to build, develop and strengthen young people in line with their stage of development, and so strengthen the Circle of Courage.",
          "We care for about 100 children in the crèche, which is on the premises of our main offices. It is aimed at children who receive the child support grant and whose families cannot afford an expensive crèche. The children range in age from 10 days to 5½ years old, and are protected under the Child Care Act.",
        ],
        points: [
          "We hold on to the slogan “Knowledge is power”, and we strive to live it",
          "Every year we send people for training and skills development to Northlink College, the University of the Western Cape, Torque IT, Huguenot College, Montessori, SEFA and Home Base Care",
        ],
        image: "/images/children-reading.jpg",
        imageAlt: "Children sitting together and reading at the crèche",
      },
    ],
  },
  {
    slug: "health",
    title: "Health",
    beneficiaries: "782",
    summary: "Home-based care, a free chronic medication dispensing unit, and HIV, TB and mental health support.",
    intro:
      "Our Health cluster brings care into people's homes. Our home base service has been funded by the Department of Health for the past 10 years.",
    image: "/images/nurse.jpg",
    imageAlt: "A Tehillah nurse caring for a patient",
    imagePosition: "50% 35%",
    sections: [
      {
        id: "home-based-care",
        label: "HOME-BASED CARE",
        heading: "Community home base care",
        paragraphs: [
          "We offer an integrated package of services so that an average of 500 chronically ill and frail clients receive accessible, quality care at home. Services include illness prevention, health promotion, therapy, rehabilitation, palliative care, and referrals to other departments and Community Health Care centres.",
        ],
        points: [
          "About 6,777 home visits and 1,252 household assessments every month",
          "80 Home Base Carers, 4 co-ordinators, 4 administrators, 2 project managers and 4 supervisors",
          "Each carer sees 10 patients every day, Monday to Friday, 8am to 1pm",
          "Carers work across greater Elsies River: Leonsdale, Avonwood, Riverton, Salberau, The Range and Epping Forest",
          "A programme specifically for clients living with HIV/AIDS, STIs and TB",
        ],
        image: "/images/health-patient.jpg",
        imageAlt: "A patient at the Tehillah clinic",
        imagePosition: "70% 40%",
      },
      {
        id: "chronic-dispensing-unit",
        label: "FREE SERVICE",
        heading: "Chronic Dispensing Unit",
        paragraphs: [
          "After listening to the community, we saw that patients were walking long distances to collect their chronic medication. We stepped in to dispense it closer to home, which also eases the load on the day hospitals.",
          "We now dispense 420 chronic medications a month, and this is growing by about 15%. This is a free service.",
        ],
        image: "/images/nurse.jpg",
        imageAlt: "A nurse checking a patient's finger at the clinic",
        imagePosition: "50% 30%",
      },
      {
        id: "medi-mobile",
        label: "MOBILE SERVICE",
        heading: "Medi Mobile",
        paragraphs: [
          "This service is for patients who cannot get around because of illness or physical disability, and so cannot collect their own medicine.",
        ],
      },
      {
        id: "support-programmes",
        label: "SUPPORT",
        heading: "More health support",
        points: [
          "Family planning and male circumcision: our staff are trained and qualified",
          "Health, mental health and HIV support groups: awareness and education about HIV, mental health and health in general",
          "Children's support group: for children living with HIV/AIDS",
        ],
      },
    ],
  },
  {
    slug: "youth",
    title: "Youth",
    beneficiaries: "470",
    summary: "The Extreme Youth programme gives young people an identity, a voice and a way to serve their community.",
    intro:
      "Our Extreme Youth programme helps young people find out who they are, and become leaders in their community.",
    image: "/images/youth-applause.jpg",
    imageAlt: "Young people clapping together at an Extreme Youth session",
    sections: [
      {
        id: "extreme-youth",
        label: "EXTREME YOUTH",
        heading: "Tehillah Extreme Youth",
        paragraphs: [
          "150 young people take part in the Extreme Youth programme, which meets every Thursday. They are actively involved in the community, working against crime, drug abuse, teenage pregnancy and HIV/AIDS.",
          "We reach young people through social cohesion, dialogue and different levels of intervention. Peer-to-peer learning is a big part of how young people learn through the different phases of life.",
        ],
        points: [
          "A dedicated programme on identity, helping young people know who they are and create new editions of old traditions",
          "Close work with the Junior City Council, and strong involvement from the Junior Mayor and their projects",
          "Advice to youth clubs, advisory centres and community projects about youth development, drawing on our long experience",
          "A dance group of 5 young people",
        ],
        image: "/images/youth-applause.jpg",
        imageAlt: "Young people clapping together at an Extreme Youth session",
      },
    ],
  },
];

export const featured = [
  {
    label: "SAFE HAVEN",
    title: "House of Magda",
    body: "A safe place in the old Avonwood School building, with 24-hour shelter and care for about 150 people who are frail, abandoned or have nowhere else to go.",
    image: "/images/house-of-magda.jpg",
    imageAlt: "The House of Magda building in the old Avonwood Primary School",
    href: "/work/social-services#house-of-magda",
    position: "50% 50%",
  },
  {
    label: "REHABILITATION",
    title: "Spread Your Wings",
    body: "A 12-week in-patient programme for adults struggling with drug and alcohol abuse, followed by aftercare and school awareness work. There are 35 bed spaces, including a place for mothers with children.",
    image: "/images/rehab-meal.jpg",
    imageAlt: "Three men sharing a meal together at the rehabilitation centre",
    href: "/work/social-services#spread-your-wings",
    position: "50% 40%",
  },
  {
    label: "FEEDING SCHEME",
    title: "Soup for the community",
    body: "For 20 years, Tehillah has given soup to 500 to 700 people a day, mostly mothers, children and people on TB or chronic treatment. Fresh vegetables from our own garden support the kitchen.",
    image: "/images/kitchen.jpg",
    imageAlt: "Two women preparing food in the Tehillah kitchen",
    href: "/work/social-services#feeding-scheme",
    position: "50% 35%",
  },
  {
    label: "WORK AND SKILLS",
    title: "Tehillah Yadah",
    body: "Sustainable projects that create jobs: Mother K's Bakery and Coffee Shop, a beauty salon, a sewing group, a gardening project, an access control company and a community radio station.",
    image: "/images/cafe.jpg",
    imageAlt: "The dining room at Mother K's Bakery and Coffee Shop",
    href: "/work/skills-development#tehillah-yadah",
    position: "50% 50%",
  },
];

export const gallery = [
  { image: "/images/youth-dance.jpg", alt: "Young people dancing in the Extreme Youth programme", caption: "Extreme Youth dance group" },
  { image: "/images/salon.jpg", alt: "A hairdresser styling a client's hair at Tehillah's beauty salon", caption: "Tehillah's beauty salon", position: "50% 30%" },
  { image: "/images/bakery.jpg", alt: "Fresh bread on the racks at Mother K's Bakery", caption: "Mother K's Bakery" },
  { image: "/images/youth-masks.jpg", alt: "Young performers in white masks and gloves", caption: "Youth drama and performance" },
];

export const vision =
  "Embracing the chance to transform communities and build a self-reliant society that can govern their own lives and family effectively. A community where every child grows up safe, supported and able to reach their full potential.";

export const mission = [
  "To build a social safety net for the poor, the vulnerable and those with special needs, in a way that helps them grow.",
  "To create an environment that empowers families and those who are socially shunned and rejected.",
  "To stay committed to the holistic process of individual self-empowerment.",
  "To provide a safe, nurturing and therapeutic environment for at-risk children removed from unsafe homes, promoting healing, stability and long-term wellbeing.",
];

// Leadership and board, from the 2025 Community Safe Haven proposal.
export const team = [
  { name: "Sr Magda Kleyn", role: "Founder and CEO" },
  { name: "Mr Christopher Isaacs", role: "Chairperson of the Board" },
  { name: "Mr Henry Davids", role: "Deputy CEO" },
  { name: "Mrs Monique Davids", role: "Secretary of the Board" },
  { name: "Mrs Connelley Soetwater", role: "Senior Social Worker" },
  { name: "Mrs Chantal Kleyn", role: "Educare Principal" },
  { name: "Mrs Samantha Yorke", role: "Finance Manager" },
  { name: "Mr Carl Appollis", role: "Board Member" },
  { name: "Ms Jamie Louw", role: "Board Member" },
];

export const objectives = [
  "To create a drug-free society with communities that can sustain themselves",
  "Promote self-empowerment",
  "Develop life skills",
  "Create educational opportunities",
  "Identify elements for entrepreneurial development",
  "Deliver health-based, community-based services",
  "Aid the elderly and those struck by poverty",
  "Early childhood development",
  "Empower the youth, with employment opportunities especially for those outside the social and economic mainstream",
];

export const values = [
  "People first",
  "Integrity",
  "Professionalism",
  "Efficiency",
  "Self-sustainability",
  "Commitment",
  "Consistency",
  "Respect",
];

// From Sr Magda Kleyn's own biography.
export const awards = [
  { year: "2004", name: "Premier's Award for commitment and extensive work in the community" },
  { year: "2005", name: "Lions Club International Woman of the Year" },
  { year: "2005", name: "Sowetan/Old Mutual/SABC Award" },
  { year: "2005", name: "Semi-finalist, National Woman of the Year and Community Builder of the Year" },
  { year: "2006", name: "Sowetan/Old Mutual/SABC Award (Adult Category)" },
  { year: "2008", name: "Nominated, Shoprite/Checkers Woman of the Year" },
];

// Our founder's story, shortened from her own biography for the public website.
// Private family details (children's families, grandchildren) are left out on purpose.
export const founder = {
  name: "Sr Magda Kleyn",
  fullName: "Magdalena Kleyn",
  role: "Founder and CEO",
  intro:
    "Sister Magda Kleyn founded Tehillah in 1996. Her own life taught her what poverty, abuse and starting again feel like, and that is why Tehillah meets people with understanding instead of judgement.",
  story: [
    "Magdalena Kleyn, born Louw, was born on 10 January 1957 in Petrusville, a small town in the Northern Cape, and grew up in Elsies River. People know her as Magda, or Sister Kleyn.",
    "Her mother, Emily Louw, shaped her life. Emily prayed every morning at 5am for her children, the community, the church and the government. For the last 20 years of her life she served Elsies River as a councillor and Commissioner of Oaths, and she was often called out at midnight to pray for the sick or help a family in crisis. \"Our house was a home for all,\" Magda remembers, \"a haven to the hopeless, a shelter to the homeless and a place of prayer for the broken hearted.\"",
    "Magda was the only daughter among seven surviving children. After her father left, the family lived in a small zinc house with one bed and paraffin lamps, getting by on a social grant and casual work. Once, walking home from an ironing job, they were attacked by dogs, and her mother was badly bitten while shielding her. Through it all, her mother taught the children to be grateful and to keep their faith. \"It was never important where we were,\" Magda says, \"but where we were heading.\"",
    "Magda passed Grade 10 but had to leave school because there was no money to continue. At 16 she started work as an assistant nurse at Red Cross Children's Hospital. A year later she was chosen for a training programme at Tygerberg Hospital and became a staff nurse, and the family moved to a better home in Leonsdale, Elsies River.",
    "Her own marriage became abusive, as her mother's had been. After six years she left, with four children aged between two and six and almost no maintenance. She went through severe depression, and with her mother's support and her faith in God she rebuilt her life. \"Failing does not make you a failure,\" she says. \"Just as hot water brings out the flavour in a tea bag, my failures brought out my full potential.\"",
    "Those years are why she understands the people Tehillah serves: abused women, single mothers, children who live through divorce or have only coffee and bread to eat, and families going in and out of the maintenance courts.",
    "After nine years working in Social Services, she resigned so that she could speak up and act freely. In 1996 she founded Tehillah Community Collaborative, five years after first sharing the vision in a job interview. She calls it her biggest achievement.",
    "Today she is a Chief Professional Nurse and a mother of six, and all of her children have gone on to do well in fields from law and business to ministry, psychology and social work. Her dream is to see Tehillah duplicated across South Africa.",
  ],
  message: "Never give up!",
  qualifications: [
    "Chief Professional Nurse",
    "Midwife",
    "Primary Healthcare Practitioner",
    "Community Healthcare Practitioner, with certificates in HIV/AIDS/STI and as a Sexual Health Practitioner",
    "Master Trainer, Certified Community Health Worker Skills Development",
    "Skills Development Specialist",
    "Basic Qualification in Child Care",
    "NPO Management Capacity Building",
    "Commissioner of Oaths",
    "Marriage Officer and counsellor",
  ],
  roles: [
    "Appointed as a Human Rights Activist by the Human Rights Commissioner of the Western Cape",
    "Ordained as an Apostle, and founder of Tehillah Ministries Extreme Oasis",
    "Ward Committee Member, Sub-Council Ward 4 (2012)",
    "Board Member, Karl Bremer Hospital (2021)",
    "Certificate of Recognition from the Department of Health for dedication, commitment and quality service",
    "Certificate of Gratitude for outstanding service in the community",
  ],
};

export const involvement = [
  {
    key: "give",
    title: "Give",
    body: "Help keep the soup pots full, the crèche open and the home visits going.",
    cta: "Ask how to give",
    primary: true,
  },
  {
    key: "volunteer",
    title: "Volunteer",
    body: "Give your time to the safe haven, the crèche, the youth programme or the garden.",
    cta: "Offer your time",
    primary: false,
  },
  {
    key: "partner",
    title: "Partner with us",
    body: "Churches, businesses and organisations: let us work together for lasting change.",
    cta: "Start a conversation",
    primary: false,
  },
];
