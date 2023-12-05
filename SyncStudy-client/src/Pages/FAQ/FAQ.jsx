import React from 'react';

const FAQ = () => {
    return (
        <div className='mb-10'>
            <h1 className='text-2xl logofont md:text-3xl text-center text-emerald-800 font-bold mb-5 mt-6'>Frequently Asked Questions (FAQ)</h1>
            <div className="collapse collapse-arrow bg-emerald-50">
  <input type="radio" name="my-accordion-2" checked="checked" /> 
  <div className="collapse-title text-xl md:text-2xl font-bold">
  What is the purpose of this group study website?
  </div>
  <div className="collapse-content"> 
    <p className='text-base md:text-lg font-medium'>Our group study website is designed to facilitate collaborative learning. You can connect with peers, upload assignments, create to-do lists, and engage in group discussions, enhancing your overall learning experience.</p>
  </div>
</div>
<div className='divider'></div>
{/* 2  */}
<div className="collapse collapse-arrow bg-emerald-50">
  <input type="radio" name="my-accordion-2" /> 
  <div className="collapse-title text-xl md:text-2xl font-bold">
    Can I upload assignments?
  </div>
  <div className="collapse-content"> 
    <p className='text-base md:text-lg  font-medium'>Yes, You can upload a assignment if you are a registered user of the system. Without a user no one can upload assignment.</p>
  </div>
</div>

<div className='divider'></div>
{/* 3  */}
<div className="collapse collapse-arrow bg-emerald-50">
  <input type="radio" name="my-accordion-2" /> 
  <div className="collapse-title text-xl md:text-2xl font-bold">
  Can I add assignments to my to-do list?
  </div>
  <div className="collapse-content"> 
    <p  className='text-base md:text-lg  font-medium'>Absolutely! In the Assignments section, each assignment has an Add to To-Do List option. Click on it, and the assignment will be added to your personal to-do list. You can keep track of your tasks and manage your time effectively.</p>
  </div>
</div>

<div className='divider'></div>
{/* 4 */}
<div className="collapse collapse-arrow bg-emerald-50">
  <input type="radio" name="my-accordion-2" /> 
  <div className="collapse-title text-xl md:text-2xl font-bold">
  Is there a discussion forum for group members?
  </div>
  <div className="collapse-content"> 
    <p  className='text-base md:text-lg  font-medium'>Yes, we have a dedicated discussion forum where group members can interact, ask questions, and share insights. Feel free to participate, exchange ideas, and collaborate with your peers to enhance your understanding of various topics.</p>
  </div>
</div>
<div className='divider'></div>
{/* 5 */}
<div className="collapse collapse-arrow bg-emerald-50">
  <input type="radio" name="my-accordion-2" /> 
  <div className="collapse-title text-xl md:text-2xl font-bold">
  Can I invite my friends to join our study group?
  </div>
  <div className="collapse-content"> 
    <p  className='text-base md:text-lg  font-medium'>Certainly! You can invite your friends to join the study group. Go to the Invite Friends section, enter their email addresses, and send the invitations. Once they accept the invitation, they can become active members of the group and participate in collaborative learning activities.</p>
  </div>
</div>
        </div>
    );
};

export default FAQ;