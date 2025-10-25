// Main JS: mobile nav toggle and form submissions (placeholder Google Sheets integration)
document.addEventListener('DOMContentLoaded', function(){
  // set year in footers
  const y = new Date().getFullYear();
  const yEls = [document.getElementById('year'), document.getElementById('year2')];
  yEls.forEach(e=>{ if(e) e.textContent = String(y); });

  // mobile nav
  const navToggle = document.getElementById('navToggle');
  const navList = document.querySelector('.nav-list');
  if(navToggle && navList){
    navToggle.addEventListener('click', ()=>{
      navList.style.display = (navList.style.display === 'block') ? 'none' : 'block';
    });
  }

  // Order form submission
  const orderForm = document.getElementById('orderForm');
  if(orderForm){
    orderForm.addEventListener('submit', async function(e){
      e.preventDefault();
      const data = {
        customerName: document.getElementById('customerName').value,
        product: document.getElementById('product').value,
        quantity: document.getElementById('quantity').value,
        address: document.getElementById('address').value,
        contact: document.getElementById('contact').value,
        submittedAt: new Date().toISOString()
      };

      // TODO: Replace the placeholder URL with your Google Sheets / Apps Script POST endpoint
      const GOOGLE_SHEETS_ENDPOINT = 'https://example.com/your-google-sheets-endpoint';

      try{
        // send to the sheets endpoint; the endpoint should accept JSON POST and write to the sheet
        const res = await fetch(GOOGLE_SHEETS_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type':'application/json' },
          body: JSON.stringify(data)
        });
        if(res.ok){
          document.getElementById('orderMessage').textContent = 'Order submitted — thank you! We will contact you shortly.';
          orderForm.reset();
        }else{
          document.getElementById('orderMessage').textContent = 'Submission failed (server). Please try again later.';
        }
      }catch(err){
        console.error(err);
        document.getElementById('orderMessage').textContent = 'Submission failed (network). Please check your connection.';
      }
    });
  }

  // Contact form submission (example: can reuse the same Google Sheets endpoint or a different one)
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', async function(e){
      e.preventDefault();
      const payload = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        message: document.getElementById('contactMessage').value,
        submittedAt: new Date().toISOString()
      };

      // TODO: Replace this placeholder URL with your real endpoint that writes to Google Sheets
      const CONTACT_ENDPOINT = 'https://example.com/your-google-sheets-contact-endpoint';

      try{
        const r = await fetch(CONTACT_ENDPOINT, {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(payload)
        });
        if(r.ok){
          document.getElementById('contactMessageText').textContent = 'Message sent — thank you!';
          contactForm.reset();
        }else{
          document.getElementById('contactMessageText').textContent = 'Failed to send (server).' ;
        }
      }catch(err){
        console.error(err);
        document.getElementById('contactMessageText').textContent = 'Failed to send (network).';
      }
    });
  }
});
