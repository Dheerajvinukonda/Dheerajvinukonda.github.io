export const resumeData = {
    personalInfo: {
        name: "Dheeraj Vinukonda",
        title: "Computer Science Engineer",
        location: "India 500096",
        email: "vinukondadheeraj@gmail.com",
        phone: "+91 9100428305",
        linkedin: "https://www.linkedin.com/in/dheeraj-vinukonda-086b32247/",
        summary: "Computer Science Engineer with a focus on Cybersecurity, Blockchain, and Machine Learning. Experienced in IoT systems, algorithmic trading, and applied AI research, with strong foundations in ethical hacking and secure systems design. Passionate about developing data-driven, secure, and scalable solutions."
    },
    education: [
        {
            degree: "Bachelor of Science in Cybersecurity & Blockchain",
            institution: "SASTRA Deemed University, Thanjavur, TN",
            duration: "2022-2025"
        },
        {
            degree: "Senior Intermediate Education",
            institution: "Narayana Junior College, Hyderabad, TS",
            duration: "2020-2021" // Image says 2020-2021, March 2021
        }
    ],
    skills: {
        languages: ["English", "Hindi", "Telugu", "Tamil", "Japanese", "Chinese (Mandarin)"],
        technical: [
            "Python", "C++", "SQL", "JavaScript", "HTML/CSS", "Solidity"
        ],
        tools: [
            "TensorFlow", "Linux", "Arduino IDE", "CNN", "Penetration Tools", "Ophcrack", "VMware", "Scikit-learn", "LDM", "PyCharm"
        ]
    },
    experience: [
        {
            role: "Research Assistant",
            company: "Dalian University of Technology, Dalian, China",
            duration: "February 2025 - Current",
            description: [
                "Created customized applications to make critical predictions, automate reasoning and decisions and calculate optimization algorithms.",
                "Built a fully functional Deep learning model based to take MRI scans for segmenting Brain Tumor.",
                "Applied loss functions and variance explanation techniques to compare performance metrics.",
                "Finalized the output of model with remarkable dice score of 0.83."
            ]
        },
        {
            role: "Cybersecurity Intern",
            company: "Verzeo EduTech, Hyderabad, TS",
            duration: "August 2022 - September 2022",
            description: [
                "Conducted vulnerability assessments using Ophcrack, focusing on GUI vulnerabilities and virtual space attacks.",
                "Developed a threat management system, incorporating ethical hacking and encryption.",
                "Gained hands-on experience in cybersecurity through the Cybersecurity Tools and Threat Management project."
            ]
        }
    ],
    projects: [
        {
            title: "SwinUNETR-CBAM-GAN for Multiyear Brain Tumor Segmentation",
            duration: "BraTS 2019 | 2020 | 2021",
            description: [
                "Built a hybrid 3D segmentation framework combining SwinUNETR, CBAM attention, and GAN-based adversarial loss to enhance tumor boundary precision.",
                "Implemented composite mask visualization, mixed-precision training, and checkpoint resumption.",
                "Achieved high Dice stability and strong cross-dataset robustness.",
                "Paper accepted for publication (Oct 2025). Tools: PyTorch, MONAI, NumPy, Matplotlib, NVIDIA A100 GPU."
            ]
        },
        {
            title: "ToufAI – AI-Powered Hair Health & Styling App (iOS)",
            description: [
                "Developed an AI-driven iOS application for real-time hair health and styling analysis using camera-based inference.",
                "Integrated pretrained hair segmentation and attribute analysis models via TensorFlow Lite.",
                "Built a personalized recommendation pipeline for hairstyle suggestions.",
                "Prototyped full mobile interface using React Native and Expo Go; backend via Flask."
            ]
        },
        {
            title: "Cloud-Based Smoke Detection System with IoT using Machine Learning",
            description: [
                "Developed an end-to-end IoT pipeline integrating Raspberry Pi, MQTT, and Flask.",
                "Trained Random Forest, ARIMA, and TensorFlow models on Kaggle environmental data.",
                "Deployed TensorFlow Lite models on Raspberry Pi 4 via Docker for fast edge inference."
            ]
        },
        {
            title: "Forecasting & Trading Stable Cryptocurrencies using Machine & Deep Learning",
            description: [
                "Designed a predictive trading framework employing Facebook Prophet, ARIMA, SVR, BI-LSTM, UNI-LSTM, and Stacked LSTM.",
                "Engineered algorithmic trading strategies using predictive analytics.",
                "Evaluated model efficacy with RMSE and R²."
            ]
        },
        {
            title: "Image Classification & Explainable Detection of AI-Generated Synthetic Images",
            description: [
                "Generated 60k synthetic images via Latent Diffusion Models (LDM).",
                "Trained a CNN achieving 92.98% accuracy distinguishing real vs AI-generated images.",
                "Applied Grad-CAM for explainability, identifying subtle background artifacts influencing classification."
            ]
        }
    ],
    certifications: [
        "Obstacle Avoidance with Voice Controlled Robot - Endorsed by SASTRA UNIVERSITY",
        "Web Design Development - Validated by IIT Hyderabad",
        "Graduate Record Examination",
        "Google Cloud CyberSecurity - Accredit by Coursera",
        "Python Programming - Approved by Coursea (University of Michigan)",
        "Start Up China Program 2025 winner",
        "IELTS Academic certificate"
    ],
    accomplishments: [
        "Made a breakthrough by publication in Multimodal Brain Tumor Segmentation in 2025.",
        "Start up china Program 2025 Winner for Best Marketing Potential Award."
    ]
};
