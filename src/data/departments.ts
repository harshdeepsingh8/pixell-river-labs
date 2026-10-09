import type { Department } from "../types/department";
import { Guid } from "guid-typescript";

export const departmentData: Department[] = [
    {
        id: Guid.create().toString(),
        name: "Administration",
        employees: [
            {id: Guid.create().toString(), firstName: "Zoë", lastName: "Robbins"},
            {id: Guid.create().toString(), firstName: "Madeleine", lastName: "Madden"}
        ]
    },
    {
        id: Guid.create().toString(),
        name: "Audit",
        employees: [
            { id: Guid.create().toString(), firstName: "Josha", lastName: "Sadowski"},
            { id: Guid.create().toString(), firstName: "Kate", lastName: "Fleetwood"}
        ]
    },
    {
        id: Guid.create().toString(),
        name: "Banking Operations",
        employees: [
            { id: Guid.create().toString(), firstName: "Priyanka", lastName: "Bose" },
            { id: Guid.create().toString(), firstName: "Hammed", lastName: "Animashaun" },
            { id: Guid.create().toString(), firstName: "Álvaro", lastName: "Morte" },
            { id: Guid.create().toString(), firstName: "Taylor", lastName: "Napier" },
            { id: Guid.create().toString(), firstName: "Alan", lastName: "Simmonds" }
        ]
    },
    {
        id: Guid.create().toString(),
        name: "Communications",
        employees: [
            { id: Guid.create().toString(), firstName: "Gil", lastName: "Cardinal" },
            { id: Guid.create().toString(), firstName: "Richard J.", lastName: "Lewis" }
        ]
    },
    {
        id: Guid.create().toString(),
        name: "Corporate Services",
        employees: [
            { id: Guid.create().toString(), firstName: "Randy", lastName: "Bradshaw" },
            { id: Guid.create().toString(), firstName: "Tracey", lastName: "Cook" },
            { id: Guid.create().toString(), firstName: "Lubomir", lastName: "Mykytiuk" }
        ]
    },
    {
        id: Guid.create().toString(),
        name: "Facilities",
        employees: [
            { id: Guid.create().toString(), firstName: "Dakota", lastName: "House" },
            { id: Guid.create().toString(), firstName: "Lori Lea", lastName: "Okemah" },
            { id: Guid.create().toString(), firstName: "Renae", lastName: "Morrisseau" },
            { id: Guid.create().toString(), firstName: "Rick", lastName: "Belcourt" }
        ]
    },
    {
        id: Guid.create().toString(),
        name: "Financial Services",
        employees: [
            { id: Guid.create().toString(), firstName: "Selina", lastName: "Hanusa" },
            { id: Guid.create().toString(), firstName: "Buffy", lastName: "Gaudry" },
            { id: Guid.create().toString(), firstName: "Shaneen Ann", lastName: "Fox" },
            { id: Guid.create().toString(), firstName: "Allan", lastName: "Little" },
            { id: Guid.create().toString(), firstName: "Danny", lastName: "Rabbit" }
        ]
    },
    {
        id: Guid.create().toString(),
        name: "Human Resources",
        employees: [
            { id: Guid.create().toString(), firstName: "Jesse Ed", lastName: "Azure" },
            { id: Guid.create().toString(), firstName: "Stacy", lastName: "Da Silva" },
            { id: Guid.create().toString(), firstName: "Vladimír", lastName: "Valenta" },
            { id: Guid.create().toString(), firstName: "Samone", lastName: "Sayeses-Whitney" },
            { id: Guid.create().toString(), firstName: "Paul", lastName: "Coeur" }
        ]
    },
    {
        id: Guid.create().toString(),
        name: "Information Technology",
        employees: [
            { id: Guid.create().toString(), firstName: "Graham", lastName: "Greene" },
            { id: Guid.create().toString(), firstName: "Sandika", lastName: "Evergreen" },
            { id: Guid.create().toString(), firstName: "Jennifer", lastName: "Rodriguez" },
            { id: Guid.create().toString(), firstName: "Aiyana", lastName: "Littlebear" },
            { id: Guid.create().toString(), firstName: "Inara", lastName: "Thunderbird" },
            { id: Guid.create().toString(), firstName: "Kaya", lastName: "Runningbrook" },
            { id: Guid.create().toString(), firstName: "Elara", lastName: "Firehawk" },
            { id: Guid.create().toString(), firstName: "Siona", lastName: "Moonflower" },
            { id: Guid.create().toString(), firstName: "Kaiyu", lastName: "Greywolf" },
            { id: Guid.create().toString(), firstName: "Ayawamat", lastName: "Nightwind" },
            { id: Guid.create().toString(), firstName: "Tala", lastName: "Braveheart" },
            { id: Guid.create().toString(), firstName: "Iniko", lastName: "Stonebear" },
            { id: Guid.create().toString(), firstName: "Onatah", lastName: "Redhawk" }
        ]
    }
];