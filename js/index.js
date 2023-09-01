// console.log("hello from index.js")
const handleCatagoriesButton = async () =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    const catagoriesName = data.data;
    // console.log(catagories);
    const catagoriesNameContainer = document.getElementById('catagories-container');
    catagoriesName.forEach(category =>{
        const div = document.createElement('div');
        // div.classList =` tabs justify-center mt-8 `
        div.innerHTML=`
        <a onclick="handleCard(${category.category_id})" class="tab btn tab-bordered font-bold active:bg-red-600 hover:bg-sky-700 hover:text-white">${category.category}</a>
        `
        catagoriesNameContainer.appendChild(div);
    })
}
const handleCard = async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const catagoriesCard = data.data;
    if(id === 1005){
        const cardContainer = document.getElementById('card-container');
        cardContainer.textContent= '';
        const div = document.createElement('div')
        div.classList= ` flex flex-col items-center justify-center absolute lg:ml-60 lg:mt-32`;
        div.innerHTML = `
        <div class="">
        <img src="image/Icon.png" alt="">
        </div>
        <h1 class="text-2xl md:text-6xl">Oops!Sorry, There is No Content Here</h1>
        `
        cardContainer.appendChild(div);
    }
    else{
        const cardContainer = document.getElementById('card-container');
        cardContainer.textContent= '';
        catagoriesCard.forEach(card=>{
            const time = parseInt(card?.others?.posted_date);
            const hour = Math.floor(time/3600);
            const minute = Math.floor((time % 3600) / 60);
            const div = document.createElement('div');
            // div.classList = `mt-8 grid grid-cols-4 gap-12`;
            div.innerHTML =`
            <div class="card card-compact w-auto bg-base-100 shadow-xl">
            <figure>
                <img class= "h-[200px] w-full rounded-md" src="${card.thumbnail}" alt="Thumbnail" />
                <p id="time-container" class=" absolute bottom-28 right-4 bg-slate-600 rounded px-2 text-white">${hour}hrs ${minute} min ago</p>
            </figure>
            <div class="card-body ">
                <div class=" flex gap-2">
                    <div>
                        <div class="avatar">
                            <div class="w-12 rounded-full">
                                <img src="${card.authors[0]?.profile_picture}" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 class="font-bold">${card.title}</h2>
                        <p>${card.authors[0]?.profile_name} <span>${card.authors[0]?.verified}</span></p>
                        <p>${card.others?.views}</p>
                    </div>
                </div>
            </div>
        </div>
            `
            cardContainer.appendChild(div);
        })
    }
    // console.log(catagoriesCard)
  
}

handleCard(id=1000);
handleCatagoriesButton();