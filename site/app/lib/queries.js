const { sql } = require("./database");

const queries = [
  `
select name, producer, registration_nr 
from car_type, car
where car_type.ID = car.car_type_ID and manufacturing_year >= 2015
order by name
`,
  `
select name, producer, price_day
from car_type, car
where car_type.ID = car.car_type_ID and price_day >= 150
order by price_day
`,
  `
select producer, name
from booking, car, car_type
where car.ID = booking.CAR_ID 
and car.ID = car_type.ID 
and datediff(day, booking.booking_date, booking.return_date) >= 15
order by producer
`,
  `
select first_name, last_name, producer, name
from car, car_type, booking, customer
where booking.ID = customer.ID 
and car_type.id = car.car_type_id
and car.id = booking.car_id
order by last_name ASC;
`,
  `
select agency.name as AgencyName, car_type.producer, car_type.name as CarTypeName
FROM agency, car, car_type
WHERE agency.ID = car.agency_ID 
and car_type.ID = car.car_type_ID
order by agency.name
`,
  `
select agency.name, location.street
from agency, location, agency_location
where agency.ID = agency_location.agency_ID 
and location.ID = agency_location.location_ID
and location.city = 'Targoviste'
order by agency.name
`,
  `
select ct.producer, avg(c.price_day) as AvragePrice
from car c, car_type ct
where c.car_type_ID = ct.ID
group by ct.producer
having avg(c.price_day) > (select avg(price_day) from car)
`,
  `
select l.city, count(b.ID) as TotalNr
from booking b, location l
where l.city in 
(select l.city
from car c, agency a, agency_location al
where b.car_ID = c.ID and c.agency_ID = a.ID 
and al.agency_ID  = a.ID and al.location_ID = l.ID)
group by l.city
order by count(b.ID) desc
`,
`
select distinct ct.name, ct.producer, c.registration_nr
from car_type ct, booking b, car c
where c.car_type_ID = ct.ID and c.ID not in 
(select distinct c.ID 
from location l, car c, booking b, car_type ct
where b.car_ID = c.ID and ct.ID = c.car_type_ID and YEAR(b.booking_date) = 2021 and l.ID not in
(select distinct l.ID
from agency_location al, agency a, location l
where al.agency_ID = a.ID and al.location_ID = l.ID and l.city = 'Bucuresti')
group by c.ID)
`,
  `
select top 1 month(b.booking_date) as Luna, count(b.ID) as nrInchirieri
from booking b 
where b.ID in 
(select b.ID 
from location l, agency a, agency_location al
where a.ID = al.agency_ID and l.ID = al.location_ID
and l.city = 'Bucuresti' and year(b.booking_date) = '2021')
group by month(b.booking_date)
order by count(b.ID) desc
`,
  `
select count(c.ID) as NrFemei
from customer c
where c.gender = 'F' and c.ID in
(select b.customer_ID from booking b where month(b.booking_date) = 7 and b.car_ID in 
(select cr.ID
from car cr, car_type ct
where cr.car_type_ID = ct.ID and ct.automatic = 1 and cr.color = 'black'))
order by count(c.ID)
`

];

const infos = [
  {
    complexity: 0,
    description:
      "Afisati numele, producatorul si numarul de inregistrare al tuturor masinilor fabricate dupa 2015 (inclusiv).",
  },
  {
    complexity: 0,
    description:
      "Numele si producatorul masinilor al caror pret zilnic este mai mic decat 150 lei (inclusiv).",
  },
  {
    complexity: 0,
    description:
      "Numele si producatorul masinilor inchiriate pentru minim 15 zile.",
  },
  {
    complexity: 0,
    description: "Afisati lista clientilor si a masinilor inchiriate de fiecare.",
  },
  {
    complexity: 0,
    description: "Afisati lista agentiilor si masinile disponibile.",
  },
  {
    complexity: 0,
    description: "Afisati strazile agentiilor din Targoviste.",
  },
  {
    complexity: 1,
    description:
      "Afisati producatorul al caror masini au media pretului mai mare decat media tututor masinilor disponibile (pret per zi).",
  },
  {
    complexity: 1,
    description:
      "Afisati topul oraselor cu cel mai mare nr de inchirieri per agentie ordonat dupa numar desc.",
  },
  {
    complexity: 1,
    description:
      "Selectati numele, producatorul si numarul de inmatriculare ale masinilor care nu au fost inchiriate niciodata in anul 2021 in bucuresti.",
  },
  {
    complexity: 1,
    description:
      "Afisati luna in care s-au inchiriat cele mai multe masini in Buc (in anul 2021).",
  },
  {
    complexity: 1,
    description:
      "Sa se determine numarul de femei care au inchiriat masini de culoare neagra si automate in luna iulie",
  },
  
];

async function getQueries() {
  const output = [];
  for (let queryIdx = 0; queryIdx < queries.length; queryIdx++) {
    const query = queries[queryIdx];
    const info = infos[queryIdx];

    try {
      output.push({
        info: {
          ...info,
          name: "Query " + (queryIdx + 1),
        },
        query: query.trim(),
        result: (await sql.query(query)).recordset,
      });
    } catch (ex) {
      console.log("failed", query);
    }
  }

  return output;
}

module.exports = {
  getQueries,
};
