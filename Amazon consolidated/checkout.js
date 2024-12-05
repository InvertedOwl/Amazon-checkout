const deliveryData = [
    {"name": "Riya Jones",  "street": "1234 apartment",  "state": "Texas", "city":  "Y6T E0W",  "country": "United States"},
    {"name": "Craig Jacob", "street": "Park st", "state": "Texas", "city": "Y6T E0W2", "country": "United States"},
    {"name": "Riya Jones", "street": "Johnson blvd", "state": "Texas", "city": "Y6T E0W3", "country": "United States"}
]
let editid = 0;

document.addEventListener("DOMContentLoaded", function () {    
    setDeliveryOptions();
})

function setDeliveryOptions() {
    const parent = document.getElementById("address-list");
    parent.innerHTML = "";
    deliveryData.forEach(deliveryinfo => {
        parent.appendChild(createAddressChoice(deliveryinfo, deliveryData.indexOf(deliveryinfo)))
    });
}

function createAddressChoice(deliveryinfo, index) {
    const label = document.createElement("label");
    label.className = "address-choice";
    label.id = "choice" + index;
  
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "deliverto";
    input.id = index;
    input.checked = (index==0);
    input.classList.add("address-input-radio")
  
    label.appendChild(input);
  
    const addressDiv = document.createElement("div");
  
    const deliveryAd2 = document.createElement("div");
    deliveryAd2.className = "delivery-ad2";
  
    const addressSpan = document.createElement("span");
    addressSpan.innerHTML = `<strong>${deliveryinfo.name}</strong><br>${deliveryinfo.street}, ${deliveryinfo.state}, ${deliveryinfo.city}, ${deliveryinfo.country}`;
  
    deliveryAd2.appendChild(addressSpan);
  
    addressDiv.appendChild(deliveryAd2);
  
    const actionSpan = document.createElement("span");
    const deleteLink = document.createElement("a");
    deleteLink.href = "#";
    deleteLink.className = "delivery-ins abutton del";
    deleteLink.textContent = "Delete address";
  
    const editLink = document.createElement("a");
    editLink.href = "#";
    editLink.className = "delivery-ins abutton edit";
    editLink.textContent = "Edit address";
  
    actionSpan.appendChild(deleteLink);
    actionSpan.innerHTML += " | "; // Add separator
    actionSpan.appendChild(editLink);
  
    addressDiv.appendChild(actionSpan);
  
    label.appendChild(addressDiv);
    return label;
}

// Catches all clicks because I was having issues with directly apply click event to the a tags
// Not sure why its the case but this works fine. A little clunky but it works.
document.addEventListener("click", function (event) {
    const target = event.target;
    if (target.matches(".delivery-ins.abutton.del")) {
        console.log("Delete link clicked:", target);
        // Get the parent label ID
        const id = target.closest("label").id.replace("choice", "");
        deleteAddress(Number(id));
    }

    if (target.matches(".delivery-ins.abutton.edit")) {
        const id = target.closest("label").id.replace("choice", "");
        editAddress(Number(id));
    }

    
});

function changeDelivery() {
    document.getElementById("changedelivery").style.display = "block";
    document.getElementById("normaldelivery").style.display = "none";
}

function deliverToThis() {
    const radios = document.getElementsByClassName("address-input-radio");
    let selectedId = 0;

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked === true) { // Use '===' for comparison
            selectedId = i; // Use the index directly from the loop
            break; // Exit the loop early once the match is found
        }
    }    

    const heading = document.getElementById("delivery-heading");
    heading.textContent = `Delivering to ${deliveryData[selectedId].name}`
    const body = document.getElementById("delivery-body");
    body.textContent = `${deliveryData[selectedId].street}, ${deliveryData[selectedId].state}, ${deliveryData[selectedId].city}, ${deliveryData[selectedId].country}`

    document.getElementById("changedelivery").style.display = "none";
    document.getElementById("normaldelivery").style.display = "block";
}

function changeCard() {
    document.getElementById("changepay").style.display = "block";
    document.getElementById("normalpay").style.display = "none";
}

function useCard() {
    const radios = document.getElementsByClassName("radio-pay");
    let selectedId = 0;

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked === true) { // Use '===' for comparison
            selectedId = i; // Use the index directly from the loop
            break; // Exit the loop early once the match is found
        }
    }    

    const heading = document.getElementById(`payheading`);
    if (selectedId == 0) {
        heading.innerHTML = `Card ending in 9009`
    }
    if (selectedId == 1) {
        heading.innerHTML = `Card ending in 5015`
    }
    if (selectedId == 2) {
        heading.innerHTML = `Card ending in 2215`
    }

    document.getElementById("changepay").style.display = "none";
    document.getElementById("normalpay").style.display = "block";
}

function editAddress(id) {
    editid = id;
    const popup = document.getElementById("edit-popup");
    popup.style.display = "flex";
    const editCountry = document.getElementById("edit-country");
    editCountry.value = deliveryData[id].country;
    const editName = document.getElementById("edit-name");
    editName.value = deliveryData[id].name;
    const editStreet = document.getElementById("edit-street");
    editStreet.value = deliveryData[id].street;
    const editState = document.getElementById("edit-state");
    editState.value = deliveryData[id].state;
    const editCity = document.getElementById("edit-city");
    editCity.value = deliveryData[id].city;
}

function applyEdits() {
    const id = editid;
    const editCountry = document.getElementById("edit-country");
    deliveryData[id].country = editCountry.value;
    const editName = document.getElementById("edit-name");
    deliveryData[id].name = editName.value;
    const editStreet = document.getElementById("edit-street");
    deliveryData[id].street = editStreet.value;
    const editState = document.getElementById("edit-state");
    deliveryData[id].state = editState.value;
    const editCity = document.getElementById("edit-city");
    deliveryData[id].city = editCity.value;
    setDeliveryOptions();
    closeEdit();
    
}

function closeEdit() {
    const popup = document.getElementById("edit-popup");
    popup.style.display = "none";
}

function deleteAddress(index) {
    console.log("Removing address at index:", index);

    const element = document.getElementById(`choice${index}`);
    if (element) {
        element.remove();
    } else {
        console.log("Element not found for index:", index);
    }

    if (index >= 0 && index < deliveryData.length) {
        deliveryData.splice(index, 1);
        console.log("Updated deliveryData:", deliveryData);

        setDeliveryOptions();
    } else {
        console.log("Invalid index:", index);
    }
}