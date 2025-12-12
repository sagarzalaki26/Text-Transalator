import React from 'react'

function Footer() {
  return (
    <div>
      <footer className="w-full text-center mt-10 text-white/90">
  <div className="py-4 bg-white/20 backdrop-blur-lg rounded-xl shadow-md border border-white/30 mx-auto max-w-lg">
    <p className="text-sm font-medium">
      © {new Date().getFullYear()} Smart Translator • Built with  by Sagar
    </p>
  </div>
</footer>

    </div>
  )
}

export default Footer
