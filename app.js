
let data = [];
const sidebarMain = document.getElementById("sidebar-main");
const labContent = document.getElementById("lab-content");
const aboutUs = document.getElementById("aboutUs");
const base64Credentials = btoa("coalition:skills-test");
const diagnos = document.getElementById("diagnos");

fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
  method: "GET",
  headers: {
    Authorization: `Basic ${base64Credentials}`,
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((murad) => {
    data.push(...murad);
    patients();
    aboutYou();
    labRess();
    Diagnos(data[0]);
    diagnosTable(data[0]);
     labTikla()

  });

  function patients() {
    data.forEach((item) => {
      sidebarMain.innerHTML += `
      <div onclick="tikla('${item.name}')" class="card">
        <div class="card-img">
          <img src="${item.profile_picture}" />
          <span class="info">
            <p>${item.name}</p>
            <p>
              <span class="gender">${item.gender}</span>
              <span class="age">${item.age}</span>
            </p>
          </span>
        </div>
        <div class="icon">
          <i class="fa-solid fa-ellipsis"></i>
        </div>
      </div>
      `;
    });
  }


function aboutYazi(aboutArg) {
  aboutArg.forEach((item) => {
    aboutUs.innerHTML = `
    <div class="about-card">
      <div class="about-img">
        <img src="${item.profile_picture}" alt="Profile Picture"/>
        <p>${item.name}</p>
      </div>
      <div class="about">
        <div class="about-content">
          <div class="about-logo">
            <i class="fa-solid fa-calendar-days"></i>
          </div>
          <div class="about-text">
            <p><span>Doğum Tarihi:</span> <span>${item.date_of_birth}</span></p>
          </div>
        </div>
        <div class="about-content">
          <div class="about-logo">
            <i class="fa-solid fa-venus-mars"></i>
          </div>
          <div class="about-text">
            <p><span>Cinsiyet:</span> <span>${item.gender}</span></p>
          </div>
        </div>
        <div class="about-content">
          <div class="about-logo">
            <i class="fa-solid fa-phone"></i>
          </div>
          <div class="about-text">
            <p><span>İletişim Bilgileri:</span> <span>${item.phone_number}</span></p>
          </div>
        </div>
        <div class="about-content">
          <div class="about-logo">
            <i class="fa-solid fa-phone"></i>
          </div>
          <div class="about-text">
            <p><span>Acil Durum İletişim:</span> <span>${item.emergency_contact}</span></p>
          </div>
        </div>
        <div class="about-content">
          <div class="about-logo">
            <i class="fa-solid fa-shield"></i>
          </div>
          <div class="about-text">
            <p><span>Sigorta Sağlayıcısı:</span> <span>${item.insurance_type}</span></p>
          </div>
        </div>
      </div>
      <div class="about-button">
        <button>Tüm Bilgileri Göster</button>
      </div>
    </div>
    `;
  });
}

function aboutYou() {
  aboutYazi(data);
}

function diagnosTable(person) {
  const ctx = document.getElementById("chart").getContext("2d");

  const Systolic = person.diagnosis_history.map(
    (entry) => entry.blood_pressure.systolic.value
  );
  const Diastolic = person.diagnosis_history.map(
    (entry) => entry.blood_pressure.diastolic.value
  );

  const labels = [
    "Oct, 2023",
    "Nov, 2023",
    "Dec, 2023",
    "Jan, 2024",
    "Feb, 2024",
    "Mar, 2024",
  ];

  console.log(Systolic, Diastolic, labels);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Systolic Pressure",
          backgroundColor: "#D617C7",
          borderColor: "#D617C7",
          borderWidth: 2,
          data: Systolic,
          lineTension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: "#D617C7",
          pointBorderColor: "#FFFFFF",
          pointBorderWidth: 2,
        },
        {
          label: "Diastolic Pressure",
          backgroundColor: "#8C6FE6",
          borderColor: "#8C6FE6",
          borderWidth: 2,
          data: Diastolic,
          lineTension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: "#8C6FE6",
          pointBorderColor: "#FFFFFF",
          pointBorderWidth: 2,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            drawOnChartArea: false,
            drawBorder: true,
            drawTicks: true,
          },
        },
        y: {
          grid: {
            drawBorder: true,
            color: "#ABB2B9",
            drawOnChartArea: true,
            drawTicks: true,
          },
        },
      },
    },
  });
}

function Diagnos(person) {
  diagnos.innerHTML = "";
  person.diagnosis_history.forEach((item) => {
    let systolicIcon = "";
    if (item.blood_pressure.systolic.levels === "Lower than Average") {
      systolicIcon = '<i class="fa-solid fa-arrow-down"></i>';
    } else if (item.blood_pressure.systolic.levels === "Higher than Average") {
      systolicIcon = '<i class="fa-solid fa-arrow-up"></i>';
    } else if (item.blood_pressure.systolic.levels === "Normal") {
      systolicIcon = '';
    }

    let diastolicIcon = "";
    if (item.blood_pressure.diastolic.levels === "Lower than Average") {
      diastolicIcon = '<i class="fa-solid fa-arrow-down"></i>';
    } else if (item.blood_pressure.diastolic.levels === "Higher than Average") {
      diastolicIcon = '<i class="fa-solid fa-arrow-up"></i>';
    } else if (item.blood_pressure.diastolic.levels === "Normal") {
      diastolicIcon = '';
    }
    let respRateIcon = item.respiratory_rate.levels === "Normal" ? "" : (item.respiratory_rate.levels === "Higher than Average" ? '<i class="fa-solid fa-arrow-up"></i> ' : '<i class="fa-solid fa-arrow-down"></i> ');
    let tempIcon = item.temperature.levels === "Normal" ? "" : (item.temperature.levels === "Higher than Average" ? '<i class="fa-solid fa-arrow-up"></i> ' : '<i class="fa-solid fa-arrow-down"></i> ');
    let heartRateIcon = item.heart_rate.levels === "Normal" ? "" : (item.heart_rate.levels === "Higher than Average" ? '<i class="fa-solid fa-arrow-up"></i> ' : '<i class="fa-solid fa-arrow-down"></i> ');

    diagnos.innerHTML = `
    <div class="diagnos-blood">
      <div class="blood-left">
        <div class="blood-left-hd">
          <p>Blood Pressure</p>
          <span>last 6 month ago <i class="fa-solid fa-arrow-down"></i></span>
        </div>
        <div id="chart-container">
          <canvas id="chart"></canvas>
        </div>
      </div>
      <div class="blood-right">
        <div class="blood-right-hd">
          <p><i class="fa-regular fa-circle"></i>Systolic</p>
          <span>${item.blood_pressure.systolic.value}</span>
          <p class="right-p">
            ${systolicIcon}${item.blood_pressure.systolic.levels}
          </p>
        </div>
        <div class="blood-right-sc">
          <p><i class="fa-regular fa-circle"></i>Diastolic</p>
          <span>${item.blood_pressure.diastolic.value}</span>
          <p class="right-p">
            ${diastolicIcon}${item.blood_pressure.diastolic.levels}
          </p>
        </div>
      </div>
    </div>
    <div class="diagnos-footer">
      <div class="footer-card ft-1">
        <div class="footer-card-img">
          <img src="img/respiratory rate.png" alt="resp" />
        </div>
        <div class="footer-card-text">
          <p>Respiratory Rate</p>
          <span>${item.respiratory_rate.value} bpm</span>
          <p> ${respRateIcon} ${item.respiratory_rate.levels}</p>
        </div>
      </div>
      <div class="footer-card ft-2">
        <div class="footer-card-img">
          <img src="img/temperature.png" alt="resp" />
        </div>
        <div class="footer-card-text">
          <p>Temperature</p>
          <span>${item.temperature.value}F</span>
          <p> ${tempIcon} ${item.temperature.levels}</p>
        </div>
      </div>
      <div class="footer-card ft-3">
        <div class="footer-card-img">
          <img src="img/HeartBPM.png" alt="resp" />
        </div>
        <div class="footer-card-text">
          <p>Heart Rate</p>
          <span>${item.heart_rate.value} bpm</span>
          <p> ${heartRateIcon} ${item.heart_rate.levels}</p>
        </div>
      </div>
    </div>`;
  });
}



function resetValue() {
  aboutUs.innerHTML = "";
  diagnos.innerHTML = "";
  labContent.innerHTML=''
}

function tikla(arg) {
  resetValue();
  let dataFilter = data.filter((item) => item.name == arg);
  yazdir(dataFilter);
  Diagnos(dataFilter[0]);
  diagnosTable(dataFilter[0]);
  console.log(dataFilter);
   labTikla(dataFilter)

}

function yazdir(aboutUsData) {
  aboutYazi(aboutUsData);
}

function labRess() {
  data.forEach((item) => {
    item.lab_results.forEach((labResult) => {
      labContent.innerHTML += `<div class="lab">
      <div class="lab-text">
      <p>${labResult}</p>
      <i class="fa-solid fa-download"></i>
      </div>
      </div>`;
    });
  });
}
 function labTikla(murad){
 
  murad.forEach(item=>item.lab_results.forEach(item=>{
    labContent.innerHTML += `<div class="lab">
    <div class="lab-text">
    <p>${item}</p>
    <i class="fa-solid fa-download"></i>
    </div>
    </div>`;
  }))

 }
