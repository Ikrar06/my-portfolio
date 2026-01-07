'use client'

import { useEffect } from 'react'

export default function ConsoleEasterEgg() {
  useEffect(() => {
    // Clear console first for clean display
    console.clear()

    // ASCII Art Banner
    const banner = `
╔══════════════════════════════════════════════╗
║                                              ║
║     ██╗██╗  ██╗██████╗  █████╗ ██████╗       ║
║     ██║██║ ██╔╝██╔══██╗██╔══██╗██╔══██╗      ║
║     ██║█████╔╝ ██████╔╝███████║██████╔╝      ║
║     ██║██╔═██╗ ██╔══██╗██╔══██║██╔══██╗      ║
║     ██║██║  ██╗██║  ██║██║  ██║██║  ██║      ║
║     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝      ║
║                                              ║
╚══════════════════════════════════════════════╝
`

    // Main banner and welcome message in one log
    console.log(
      '%c' + banner + '\n\n' +
      '%cHello, curious developer!\n' +
      '%cWelcome to my portfolio. I see you\'re checking out the console.\n\n' +
      '%cFun fact: This site is built with Next.js 15, TypeScript, and Tailwind CSS.\n\n' +
      '%cLooking for something specific? Feel free to explore!\n\n' +
      '%cWant to collaborate? Reach out at ikrargempurtrn@gmail.com\n' +
      '%cGitHub: github.com/Ikrar06\n\n' +
      '%cHappy exploring!\n\n' +
      '%cTip: Try typing ikrar.info() in the console',
      'color: #0099FF; font-weight: bold; font-family: monospace;',
      'font-size: 16px; font-weight: bold; color: #0099FF;',
      'font-size: 12px; color: #a3a3a3;',
      'font-size: 11px; color: #737373;',
      'font-size: 11px; color: #737373;',
      'font-size: 11px; color: #0099FF;',
      'font-size: 11px; color: #737373;',
      'font-size: 12px; font-weight: bold; color: #0099FF;',
      'color: #a3a3a3; font-size: 11px;'
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
