# CASE FILES - FBI Investigation Game

A standalone, hyper-realistic FBI investigation game built with vanilla HTML, CSS, and JavaScript. No external dependencies required.

## Features

- **Immersive FBI Investigation Gameplay**: Navigate crime scenes, interrogate suspects, collect evidence
- **Procedural Risk System**: Your choices affect the case outcome - too many violations can compromise the case
- **Conviction Probability Tracking**: Build a strong case with legally obtained evidence
- **AI-Simulated Interrogations**: Choose your approach - professional, aggressive, sympathetic, or strategic silence
- **Career Progression**: Earn XP and climb the ranks from Analyst to Task Force Lead
- **Multiple Case Outcomes**: CLOSED, DISMISSED, COMPROMISED, or ESCALATED based on your investigation

## Project Structure

```
standalone-case-files/
├── index.html      # Main HTML file
├── styles.css      # All CSS styles
├── app.js          # Main application logic
├── cases.js        # Case data (local JSON)
├── vercel.json     # Vercel deployment config
└── README.md       # This file
```

## Run Locally

### Option 1: Simple HTTP Server (Python)

```bash
cd standalone-case-files
python -m http.server 8080
```

Then open http://localhost:8080 in your browser.

### Option 2: Live Server (VS Code)

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 3: Node.js HTTP Server

```bash
npm install -g http-server
cd standalone-case-files
http-server -p 8080
```

Then open http://localhost:8080 in your browser.

## Deploy to Vercel

### Option 1: Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd standalone-case-files
vercel
```

3. Follow the prompts to complete deployment

### Option 2: Vercel Dashboard (Git Integration)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your repository
5. Click "Deploy"

### Option 3: Drag and Drop

1. Go to [vercel.com](https://vercel.com)
2. Drag the `standalone-case-files` folder onto the page
3. Vercel will automatically deploy

## Deploy to Netlify

### Option 1: Netlify CLI

```bash
npm install -g netlify-cli
cd standalone-case-files
netlify deploy --prod
```

### Option 2: Drag and Drop

1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag the `standalone-case-files` folder to the deploy area
3. Done!

## Adding More Cases

Edit `cases.js` to add new cases. Each case follows this structure:

```javascript
{
    id: "case-xxx",
    case_id: "FBI-TYPE-YY-XXX",
    case_type: "HOM", // HOM, CYB, FIN, TER, KID, etc.
    title: "Case Title",
    location_county: "County",
    location_state: "State",
    victim_overview: "Brief description...",
    summary: "Case summary...",
    difficulty: 3, // 1-5
    time_limit_minutes: 20,
    tags: ["tag1", "tag2"],
    threat_level: "high", // low, moderate, high, critical
    crime_classification: "Homicide",
    conviction_threshold: 70, // Minimum % for CLOSED ending
    max_procedural_violations: 3,
    is_free: true, // or false for premium
    suspects: [...],
    scenes: [...],
    clues: [...],
    endings: [...]
}
```

## Optional: External Services

The game is fully functional without any external services. However, you can optionally integrate:

### AI Interrogation (OpenAI)

Replace the `generateInterrogationResponse()` function in `app.js` with an API call:

```javascript
async function generateInterrogationResponse(suspect, question, approach) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${YOUR_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: `You are ${suspect.name}...` },
                { role: 'user', content: question }
            ]
        })
    });
    const data = await response.json();
    return { text: data.choices[0].message.content };
}
```

### User Authentication (Firebase)

For persistent user accounts across devices, integrate Firebase Authentication.

### Database (Firebase Firestore)

For cloud-saved progress, integrate Firebase Firestore.

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

MIT License - Feel free to use, modify, and distribute.

## Credits

Built as a standalone version of the CASE FILES FBI Investigation Game.
