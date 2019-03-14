const getHedgehogs = () => {
  $('#hedgehog-info').html('');
// go to this api url
  fetch(`https://hedgehog-party.herokuapp.com/api/v1/invites`)
  //promise: when the response is successful, render the json
    .then(response => response.json())
    //promise chain: when the response is successful, add the new hedgehog
    //via appeandHedgehogs
    .then(hedgehogs => appendHedgehogs(hedgehogs))
    //throw an error if the function fails
    .catch(error => console.error({ error }));
};

const appendHedgehogs = (hedgehogs) => {
  hedgehogs.forEach(hedgehog => {
    appendHedgehog(hedgehog);
  });
};

const appendHedgehog = (hedgehog) => {
  $('#invited-hedgehogs-info').append(`
    <article class="invited-hedgehog">
      <p class="name">${hedgehog.name}</p>
      <p class="hoglet-number">${hedgehog.hoglets}</p>
      <p class="allergies">${hedgehog.allergies}</p>
      <button
        id="${hedgehog.id}"
        class="uninvite-btn"
        aria-label="Uninvite">
        uninvite
      </button>
    </article>
  `);
};

const addNewHedgehog = (event) => {
  event.preventDefault();
  let name = $("#name").val();
  let hoglets = $("#hoglets").val();
  let allergies = $("#allergies").val();
  fetch('https://hedgehog-party.herokuapp.com/api/v1/invites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "name": name,
      "hoglets": hoglets,
      "allergies": allergies
    })
    }).then(response => response.json())
    .catch(error => console.error({ error }));
};


const unInviteHedgehog = (event) => {
  event.preventDefault();
  let id = event.target.id
  console.log("we are in the unInviteHedgehog function");
  fetch(`https://hedgehog-party.herokuapp.com/api/v1/invites/${id}`, {
    method: 'DELETE',
    headers: { "Access-Control-Allow-Methods": "DELETE" }
  })
  .then(response => response.json())
  .catch(error => console.error({ error }));
  };

getHedgehogs();

$('#invite-btn').on('click', addNewHedgehog);


$('#invited-hedgehogs-info').on('click', '.uninvite-btn', unInviteHedgehog);

//URL: https://hedgehog-party.herokuapp.com/api/v1/invites
