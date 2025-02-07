import React from 'react'
  
const GMap = () => {
  return (
    <div className="google-map-code">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52924059.64213272!2d-161.87206138617!3d35.94138596545394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sus!4v1738888647800!5m2!1sen!2sus"
                title='map'
                width="100%"
                height="auto"
                frameborder="0"
                style={{ border: 0 }}
                allowfullscreen=""
                aria-hidden="false"
                tabindex="0"
            />
        </div>
  )
}

export default GMap