let flag = 0
let res = []
function onEventChanges() {
    const event = document.getElementById('event');
    const ageContainer = document.getElementById('ageInput');
    const ageValue = document.getElementById('age');
  
    if (eventSelect.value === 'יום הולדת') {
      ageContainer.style.display = 'block';
    } else {
      ageContainer.style.display = 'none';
      ageValue.value = '';
    }
  }
  function refresh(){
    location.reload();
    flag = 0
    res = []
    }
  function submit() {
    const response = document.getElementById('responseContainer')
    const category = document.getElementById('category').value;
    const event = document.getElementById('event').value;
    const age = document.getElementById('age').value;
    const atmosphere = document.getElementById('atmosphere').value
    const details = {
      category:category,
      atmosphere:atmosphere,
      event:event,
      age:age
    }

    response.style.display = 'block';
    response.innerHTML = `<p>אנא המתן</p>`;
    const ageInput = document.getElementById('age');
    const selectedCategory = document.getElementById('category');
    const selectedEvent = document.getElementById('event');
    const selectedatmosphere = document.getElementById('atmosphere');
    const refresh = document.getElementById("rel")
    
    selectedCategory.style.display = 'none'
    selectedEvent.style.display = 'none'
    selectedatmosphere.style.display = 'none'
    ageInput.style.display = 'none';
    document.querySelector('label[for="category"]').style.display = 'none';    
    document.querySelector('label[for="event"]').style.display = 'none';    
    document.querySelector('label[for="age"]').style.display = 'none';    
    document.querySelector('label[for="atmosphere"]').style.display = 'none';   
    
    refresh.style.display = 'block'
    refresh.textContent = " :אווירה "+atmosphere+" :סוג"+category + ' אירוע: '+event;
    if (age!='')
    refresh.textContent += ' גיל ' + age;

    document.getElementById("submitButton").innerText = "משהו אחר";

    if (!flag){
      const queryString = Object.keys(obj).map(key => key + '=' + obj[key]).join('&'); 
    const url = `/get` + '?' + queryString;  
    fetch(url)
      .then(response =>response.text()
         )
      .then(data => {
        flag = 3
        res[0] = data
        res = res[0].split(flag+".")
        const responseContainer = document.getElementById('responseContainer');
        responseContainer.innerHTML = `<p>${res[1]}</p>`;
        flag-=1
      })
      .catch(error => {
        console.error('Error:', error);
      });

    }
    else{
      res = res[0].split(degel+".")
      responseContainer.innerHTML = `<p>${res[1]}</p>`;
      flag-=1;
    }
  }

  
