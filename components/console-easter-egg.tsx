'use client'

import { useEffect } from 'react'

export default function ConsoleEasterEgg() {
  useEffect(() => {
    // Clear console first for clean display
    console.clear()

    // ASCII Art Banner
    const banner = `
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║     ██╗██╗  ██╗██████╗  █████╗ ██████╗                         ║
║     ██║██║ ██╔╝██╔══██╗██╔══██╗██╔══██╗                        ║
║     ██║█████╔╝ ██████╔╝███████║██████╔╝                        ║
║     ██║██╔═██╗ ██╔══██╗██╔══██║██╔══██╗                        ║
║     ██║██║  ██╗██║  ██║██║  ██║██║  ██║                        ║
║     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝                        ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
`

    console.log(
      '%c' + banner,
      'color: #0099FF; font-weight: bold; font-family: monospace;'
    )

    console.log(
      '%cHello, curious developer!',
      'font-size: 16px; font-weight: bold; color: #0099FF;'
    )

    console.log(
      '%cWelcome to my portfolio. I see you\'re checking out the console.',
      'font-size: 12px; color: #a3a3a3;'
    )

    console.log(
      '%c\nFun fact: This site is built with Next.js 15, TypeScript, and Tailwind CSS.',
      'font-size: 11px; color: #737373;'
    )

    console.log(
      '%c\nLooking for something specific? Feel free to explore!',
      'font-size: 11px; color: #737373;'
    )

    console.log(
      '%c\nWant to collaborate? Reach out at ikrargempurtrn@gmail.com',
      'font-size: 11px; color: #0099FF;'
    )

    console.log(
      '%c\nGitHub: github.com/Ikrar06',
      'font-size: 11px; color: #737373;'
    )

    console.log(
      '%c\n─────────────────────────────────────────────────────────────',
      'color: #404040;'
    )

    console.log(
      '%c\nHappy exploring!',
      'font-size: 12px; font-weight: bold; color: #0099FF;'
    )

    // Fun interactive command
    console.log('\n')
    console.log(
      '%cTip: Try typing %cikrar.info()%c in the console',
      'color: #a3a3a3;',
      'color: #0099FF; font-weight: bold; background: #1a1a1a; padding: 2px 6px; border-radius: 3px;',
      'color: #a3a3a3;'
    )

    // Add interactive function
    // @ts-ignore
    window.ikrar = {
      info: () => {
        console.log(
          '%c\n' +
            '╔═══════════════════════════════════════════════════╗\n' +
            '║  Name: Ikrar Gempur Tirani                        ║\n' +
            '║  Role: Informatics Student                        ║\n' +
            '║  Focus: Data Science & Machine Learning           ║\n' +
            '║  University: Hasanuddin University                ║\n' +
            '║  Email: ikrargempurtrn@gmail.com                  ║\n' +
            '╚═══════════════════════════════════════════════════╝',
          'color: #0099FF; font-family: monospace;'
        )
      },
      skills: () => {
        console.table({
          'Languages': 'Python, TypeScript, JavaScript',
          'ML/DL': 'TensorFlow, PyTorch, Scikit-learn',
          'Frontend': 'React, Next.js, Tailwind CSS',
          'Data': 'Pandas, NumPy, Matplotlib',
          'Tools': 'Git, Docker, VS Code'
        })
      },
      contact: () => {
        console.log(
          '%c\nEmail: ikrargempurtrn@gmail.com\n' +
          'LinkedIn: linkedin.com/in/ikrar-gempur-tirani\n' +
          'GitHub: github.com/Ikrar06',
          'color: #0099FF; font-size: 12px;'
        )
      }
    }

    // Hint about available functions
    console.log(
      '%c\nAvailable commands:\n' +
      '  • ikrar.info() - Show my information\n' +
      '  • ikrar.skills() - View my tech stack\n' +
      '  • ikrar.contact() - Get contact details',
      'color: #525252; font-size: 11px; font-family: monospace;'
    )
  }, [])

  return null
}
