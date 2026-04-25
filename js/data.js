export const electionData = {
    timeline: [
        {
            title: "Pre-Election Phase & Planning",
            desc: "The Electoral Management Body (EMB) prepares for the upcoming election.",
            details: [
                "Delimitation of constituencies based on recent census.",
                "Procurement of voting materials (EVMs, ballots, ink).",
                "Training of millions of polling officials and security personnel."
            ]
        },
        {
            title: "Announcement & Model Code",
            desc: "The official dates are announced, triggering the Model Code of Conduct.",
            details: [
                "Press conference by the Election Commission.",
                "Model Code of Conduct comes into force immediately.",
                "Government barred from announcing new schemes to prevent undue influence."
            ]
        },
        {
            title: "Voter Registration",
            desc: "Final update of the electoral rolls to ensure all eligible citizens can vote.",
            details: [
                "Citizens aged 18+ can apply using Form 6.",
                "Draft rolls published for public scrutiny and objections.",
                "Final Electoral Roll is published."
            ]
        },
        {
            title: "Candidate Nomination",
            desc: "Candidates officially file papers to contest the election.",
            details: [
                "Filing of nomination papers with the Returning Officer.",
                "Submission of mandatory affidavits (criminal records, assets).",
                "Scrutiny of nominations and withdrawal period."
            ]
        },
        {
            title: "Campaigning",
            desc: "Political parties and candidates present their vision to the voters.",
            details: [
                "Manifestos released.",
                "Rallies, public meetings, and digital campaigns.",
                "Campaigning ends 48 hours before polling (Silence Period)."
            ]
        },
        {
            title: "Polling Day",
            desc: "Voters cast their ballots at designated polling booths.",
            details: [
                "Booths open typically from 7 AM to 6 PM.",
                "Verification of voter identity via EPIC or other valid ID.",
                "Voting via EVMs with VVPAT slips for verification."
            ]
        },
        {
            title: "Counting & Results",
            desc: "The votes are tallied and the winners are officially declared.",
            details: [
                "Postal ballots counted first.",
                "EVM votes counted in rounds under strict security.",
                "VVPAT slips matched randomly for verification.",
                "Returning Officer declares the final results."
            ]
        }
    ],

    exploreContent: {
        "voter-rights": `
            <h3>Your Democratic Rights</h3>
            <p>Every eligible citizen is guaranteed certain fundamental rights in a democratic election:</p>
            <ul>
                <li><strong>Universal Adult Suffrage:</strong> The right to vote regardless of race, gender, religion, or wealth.</li>
                <li><strong>Secret Ballot:</strong> The absolute right to cast your vote in private without intimidation or fear of reprisal.</li>
                <li><strong>Information:</strong> The right to know the background, criminal records, and assets of contesting candidates.</li>
                <li><strong>NOTA (None of the Above):</strong> The right to officially register dissatisfaction with all available candidates.</li>
            </ul>
        `,
        "electoral-systems": `
            <h3>How Votes Translate to Power</h3>
            <p>Different countries use different mathematical models to convert votes into legislative seats:</p>
            <ul>
                <li><strong>First-Past-The-Post (FPTP):</strong> Used in India, US, UK. The candidate with the most votes in a constituency wins, even if it's less than 50%.</li>
                <li><strong>Proportional Representation (PR):</strong> Used in many European nations. Parties get seats strictly proportional to their overall vote share.</li>
                <li><strong>Ranked Choice / Instant Runoff:</strong> Used in Australia. Voters rank candidates. If no one gets 50%, lowest candidates are eliminated and votes redistributed until a majority is reached.</li>
            </ul>
        `,
        "campaign-finance": `
            <h3>Money in Politics</h3>
            <p>Regulating campaign finance is critical to prevent wealth from disproportionately influencing elections.</p>
            <ul>
                <li><strong>Expenditure Limits:</strong> Caps on how much a candidate can spend in their constituency.</li>
                <li><strong>Transparency:</strong> Parties must disclose large donations and audit their accounts.</li>
                <li><strong>State Funding:</strong> Some countries provide public funds to political parties to level the playing field.</li>
            </ul>
        `,
        "election-security": `
            <h3>Protecting the Vote</h3>
            <p>Modern elections require robust security against both physical and cyber threats.</p>
            <ul>
                <li><strong>EVM Security:</strong> Machines are standalone, non-networked devices to prevent hacking.</li>
                <li><strong>VVPAT:</strong> Voter Verifiable Paper Audit Trail allows voters to visually confirm their vote before it drops into a sealed box.</li>
                <li><strong>Cybersecurity:</strong> Protecting voter registration databases from unauthorized alterations.</li>
            </ul>
        `,
        "media-role": `
            <h3>The Fourth Estate</h3>
            <p>A free press is essential for an informed electorate.</p>
            <ul>
                <li><strong>Impartial Reporting:</strong> State media is typically mandated to give equal time to major parties.</li>
                <li><strong>Combating Misinformation:</strong> Fact-checking deepfakes and fake news during campaigns.</li>
                <li><strong>Exit Polls:</strong> Surveys of voters leaving booths, often restricted until all phases of voting are complete to prevent influencing active voters.</li>
            </ul>
        `,
        "accessibility": `
            <h3>Inclusive Voting</h3>
            <p>Democracy must be accessible to every citizen, regardless of physical limitations.</p>
            <ul>
                <li><strong>Physical Access:</strong> Ramps, wheelchairs, and ground-floor polling stations.</li>
                <li><strong>Visual Impairment:</strong> Braille on EVMs and permission for companion assistance.</li>
                <li><strong>Remote Voting:</strong> Postal ballots for seniors (85+), persons with disabilities, and essential service workers.</li>
            </ul>
        `
    },

    quiz: [
        {
            q: "What does EVM stand for?",
            options: ["Electronic Voting Machine", "Electoral Verification Module", "Election Validation Mechanism", "Electronic Voter Matrix"],
            answer: 0,
            explanation: "EVM stands for Electronic Voting Machine, which replaced paper ballots in many countries to make voting faster and reduce invalid votes."
        },
        {
            q: "What is the purpose of the 'Silence Period' before an election?",
            options: ["To give candidates a rest", "To allow voters a peaceful time to make their decision without campaign noise", "To count postal ballots", "To repair voting machines"],
            answer: 1,
            explanation: "The Silence Period, usually 48 hours before voting, bans all active campaigning to allow voters to reflect calmly on their choice."
        },
        {
            q: "In the First-Past-The-Post system, what does a candidate need to win?",
            options: ["More than 50% of the votes", "More votes than any other single candidate", "Two-thirds of the votes", "Approval from the Election Commission"],
            answer: 1,
            explanation: "In FPTP, the candidate with the highest number of votes wins the constituency, even if they do not secure an absolute majority (>50%)."
        },
        {
            q: "What does VVPAT do?",
            options: ["Registers new voters online", "Prints a paper slip verifying the vote cast on an EVM", "Scans fingerprints for identification", "Calculates the final election results automatically"],
            answer: 1,
            explanation: "VVPAT (Voter Verifiable Paper Audit Trail) prints a slip showing the candidate chosen, which is visible for 7 seconds before dropping into a sealed box."
        },
        {
            q: "Which age group is generally eligible to vote in most modern democracies?",
            options: ["16 and above", "18 and above", "21 and above", "25 and above"],
            answer: 1,
            explanation: "In most democratic nations, including India, the US, and the UK, the universal voting age is 18."
        }
    ],

    glossary: [
        { term: "Ballot", definition: "A device (paper or electronic) used to cast votes in an election." },
        { term: "Constituency", definition: "A specific geographical area that a representative is elected to represent." },
        { term: "Delimitation", definition: "The act of redrawing the boundaries of assembly or parliamentary constituencies to reflect population changes." },
        { term: "Electoral Roll", definition: "The official list of all registered voters eligible to vote in a specific area." },
        { term: "Exit Poll", definition: "A poll of voters taken immediately after they have exited the polling stations." },
        { term: "Incumbent", definition: "The current holder of a political office." },
        { term: "Manifesto", definition: "A published declaration of the intentions, motives, or views of a political party." },
        { term: "NOTA", definition: "None Of The Above; an option allowing voters to disapprove of all candidates." },
        { term: "Psephology", definition: "The statistical study of elections and trends in voting." },
        { term: "Suffrage", definition: "The right to vote in political elections." }
    ],

    global: [
        {
            id: "india",
            name: "India",
            flag: "🇮🇳",
            system: "First-Past-The-Post (FPTP)",
            body: "Election Commission of India (ECI)",
            turnout: "~67%",
            method: "EVMs with VVPAT",
            unique: "Largest democratic exercise in human history. Polling stations must be within 2km of every voter."
        },
        {
            id: "usa",
            name: "United States",
            flag: "🇺🇸",
            system: "Electoral College (President), FPTP (Congress)",
            body: "Decentralized (State & County level)",
            turnout: "~66%",
            method: "Mixed (Paper, DRE machines, Mail-in)",
            unique: "Elections are run locally, leading to varying rules across states. High use of mail-in voting."
        },
        {
            id: "australia",
            name: "Australia",
            flag: "🇦🇺",
            system: "Ranked Choice / Preferential Voting",
            body: "Australian Electoral Commission (AEC)",
            turnout: "~90%+",
            method: "Paper Ballots",
            unique: "Voting is compulsory by law. Failure to vote results in a fine."
        },
        {
            id: "uk",
            name: "United Kingdom",
            flag: "🇬🇧",
            system: "First-Past-The-Post (FPTP)",
            body: "Electoral Commission",
            turnout: "~67%",
            method: "Paper Ballots",
            unique: "Traditionally vote on Thursdays. Counting is done manually."
        },
        {
            id: "germany",
            name: "Germany",
            flag: "🇩🇪",
            system: "Mixed-Member Proportional (MMP)",
            body: "Federal Returning Officer",
            turnout: "~76%",
            method: "Paper Ballots",
            unique: "Voters cast two votes: one for a local representative and one for a party list."
        }
    ]
};
