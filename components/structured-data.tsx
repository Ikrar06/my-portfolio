// components/structured-data.tsx
export default function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  // Person Schema - About yourself as a student
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ikrar Gempur Tirani',
    url: siteUrl,
    image: `${siteUrl}/images/foto-ikrar.jpg`,
    jobTitle: 'Informatics Engineering Student',
    description: 'Informatics Engineering student at Hasanuddin University (GPA 3.92/4.00) learning Data Science and Machine Learning. Passionate about NLP, statistical modeling, and building ML systems.',
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Hasanuddin University',
      sameAs: 'https://www.unhas.ac.id/',
    },
    knowsAbout: [
      'Machine Learning',
      'Natural Language Processing',
      'Data Science',
      'Statistical Analysis',
      'Python Programming',
      'Deep Learning',
      'TensorFlow',
      'PyTorch',
    ],
    sameAs: [
      'https://github.com/Ikrar06',
      'https://www.linkedin.com/in/ikrar-gempur-tirani',
    ],
  }

  // WebSite Schema - For search box and site navigation
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ikrar Gempur Tirani - Portfolio',
    description: 'Personal portfolio of Ikrar Gempur Tirani, an Informatics Engineering student learning Data Science and Machine Learning at Hasanuddin University.',
    url: siteUrl,
    author: {
      '@type': 'Person',
      name: 'Ikrar Gempur Tirani',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/project?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  // BreadcrumbList Schema - For better navigation in search results
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Projects',
        item: `${siteUrl}/project`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Design',
        item: `${siteUrl}/design`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'About',
        item: `${siteUrl}/about`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Contact',
        item: `${siteUrl}/contact`,
      },
    ],
  }

  // ProfilePage Schema
  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'Ikrar Gempur Tirani',
      description: 'Informatics Engineering student learning Data Science and Machine Learning',
      image: `${siteUrl}/images/foto-ikrar.jpg`,
    },
  }

  return (
    <>
      {/* Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ProfilePage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  )
}
