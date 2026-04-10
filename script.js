
const switchMode = () => {
    if (document.body.classList.contains("light")) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }

}

const input = document.getElementById('search')

    
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const value = document.getElementById('search').value.trim()
            detailNameFetch(value)
  }
});

const countryContainer = document.getElementById('countryDiv')
const detailDiv = document.getElementById('detailDiv')

async function fetchAll(){
    try{
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3')
    
        if (!response.ok){
            throw new Error("No se pudo hacer el fetch All")
        }
    
        const data = await response.json()

        countryContainer.innerHTML = ""
        data.forEach(element => {
            
           countryContainer.innerHTML += 
           `
           <div onclick="detailFetch('${element.cca3}')" class="countryCard">
           <img src="${element.flags.png}" class="imgCard " alt="${element.flags.alt}">
           <h3>${element.name.common}</h3>
           <p><strong>Population: </strong> ${element.population}</p>
           <p><strong>Region: </strong> ${element.region}</p>
           <p><strong>Capital: </strong> ${element.capital}</p>
           </div>         
           ` 
           
        });


       
        
    }catch (error) {
        console.error("Hubo un problema:", error);
        alert("Error");
    }
}

async function fetchRegion(region) {
    
    
    try{
        const response = await fetch(`https://restcountries.com/v3.1/region/${region}`)
        if (!response.ok){
            throw new Error("No se pudo hacer el fetch region", region)
        }
        
        const data = await response.json()
        countryContainer.innerHTML = ""

        data.forEach(element => {


            countryContainer.innerHTML += 
            `
            <div  onclick="detailFetch('${element.cca3}')"   class="countryCard">
            
                <img src="${element.flags.png}" class="imgCard " alt="${element.flags.alt}">
                <h3>${element.name.common}</h3>
                <p><strong>Population: </strong> ${element.population}</p>
                <p><strong>Region: </strong> ${element.region}</p>
                <p><strong>Capital: </strong> ${element.capital}</p>
           </div>  
            `
            
        });
        



    } catch (error) {
        console.error("Hubo un problema:", error);
        alert("Error");
    }


    

}


async function detailFetch(cca3){
    
    countryContainer.classList.remove('countryDiv')
    countryContainer.classList.add('invisible')

    document.getElementById('detailDiv').classList.remove('invisible')
    document.getElementById('detailDiv').classList.add('hideDetailDiv')
    
    document.getElementById('searchDiv').classList.remove('searchDiv')
    document.getElementById('searchDiv').classList.add('invisible')


    
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`)
    
    if(!response.ok){
        throw new Error("Hay un error en el detailfetch")
    }
    const data = await response.json()
    const country = data[0]


    const countryDetail = document.getElementById('countryDetail') 
    const nativeName = Object.values(country.name.nativeName)[0].common;
    const currencies = Object.values(country.currencies)[0].name;
    const languages = Object.values(country.languages).join(", ");
    countryDetail.innerHTML =  
    `
                    <img src="${country.flags.png}" alt="">
        
                    <div>
                        <h2>${country.name.common}</h2>
                        <div class="columns">
                            <p><strong>Native Name: </strong>${nativeName}</p>
                            <p><strong>Population: </strong>${country.population}</p>
                            <p><strong>Region: </strong>${country.region}</p>
                            <p><strong>Sub Region: </strong>${country.subregion}</p>
                            <p><strong>Capital: </strong>${country.capital?.[0] ?? "No tiene capital"}</p>
                            <p><strong>Top level Domain: </strong>${country.tld[0]}</p>
                            <p><strong>Currencies: </strong>${currencies}</p>
                            <p><strong>Languajes: </strong>${languages}</p>

                        </div>
                    </div>
    `

    let borderCountries = document.getElementById('borderCountries')

    borderCountries.innerHTML= 
    `
    <p><strong>Border Countries:</strong></p>
    `

    country.borders.forEach(element => {
        borderCountries.innerHTML +=
        `
        <button class="detailButton" onclick="detailFetch('${element}')">${element}</button>
        `
    });
    
    
    
    
    
}

async function detailNameFetch(name){
    
    countryContainer.classList.remove('countryDiv')
    countryContainer.classList.add('invisible')

    document.getElementById('detailDiv').classList.remove('invisible')
    document.getElementById('detailDiv').classList.add('hideDetailDiv')
    
    document.getElementById('searchDiv').classList.remove('searchDiv')
    document.getElementById('searchDiv').classList.add('invisible')


    
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`)
    
    if(!response.ok){
        throw new Error("Hay un error en el detailfetch")
    }
    const data = await response.json()
    const country = data[0]


    const countryDetail = document.getElementById('countryDetail') 
    const nativeName = Object.values(country.name.nativeName)[0].common;
    const currencies = Object.values(country.currencies)[0].name;
    const languages = Object.values(country.languages).join(", ");
    countryDetail.innerHTML =  
    `
                    <img src="${country.flags.png}" alt="">
        
                    <div>
                        <h2>${country.name.common}</h2>
                        <div class="columns">
                            <p><strong>Native Name: </strong>${nativeName}</p>
                            <p><strong>Population: </strong>${country.population}</p>
                            <p><strong>Region: </strong>${country.region}</p>
                            <p><strong>Sub Region: </strong>${country.subregion}</p>
                            <p><strong>Capital: </strong>${country.capital?.[0] ?? "No tiene capital"}</p>
                            <p><strong>Top level Domain: </strong>${country.tld[0]}</p>
                            <p><strong>Currencies: </strong>${currencies}</p>
                            <p><strong>Languajes: </strong>${languages}</p>

                        </div>
                    </div>
    `

    let borderCountries = document.getElementById('borderCountries')

    borderCountries.innerHTML= 
    `
    <p><strong>Border Countries:</strong></p>
    `
    
    country.borders.forEach(element => {
        borderCountries.innerHTML +=
        `
        <button class="detailButton" onclick="detailFetch('${element}')">${element}</button>
        `
    });
    
    
    
    
    
}

async function backBtn() {
    
    countryContainer.classList.remove('invisible')
    countryContainer.classList.add('countryDiv')
    
    document.getElementById('detailDiv').classList.remove('hideDetailDiv')
    document.getElementById('detailDiv').classList.add('invisible')
    
    
    document.getElementById('searchDiv').classList.add('searchDiv')
    document.getElementById('searchDiv').classList.remove('invisible')
    

}

