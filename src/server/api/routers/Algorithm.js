/*
    Basis of CareConnect system:
    Everytime a patient is pushed into the system by a hospital, they will go into the patient database. That patient will be extracted from 
    the database and will be assigned a priority score. Using this priority score, the patient will be pushed into a priority queue. Everytime, 
    the patient at the top of the queue will be extracted and passed into the algorithm function. The algorithm will assign the patient an 
    ECMO (1 - 27).

    1. If two patients have the same priority score, the patient pushed into the queue first will be higher up in the queue i.e. they will be
    ordered based on when they were pushed into the queue.
*/

/*
    Notes for me:
    1. Start by basic building blocks. First, design the assignPriorityScore function. Then, work on the priority queue functionality. Then,
    work on the allocation algorithm function
    2. For the algorithm, start basic. Always assign the next patient in the priority queue to the next available ECMO, regardless of age, 
    severity and location. Do this until all ECMOs are occupied. 
*/

/*
    1. If two people are close to an ECMO machine and their severeity is not that bad, then they should be assigned to that same ECMO.
    2. Always assign a patient to the closest ECMO up untill a certain severity score (maybe factor in age here too).
    3. After a certain high severity score and age combo, the patient should be pushed to the top of the queue and assigned the next
    available ECMO.
*/
function allocationAlgorithm(severity, specialCareCategory, age, location) { //parameters represent patient data
//return ECMO for patient
}

function assignPriorityScore(severeity, specialCareCategory, age) {//assigns priority score for patient to determine patient's priority in priority
//queue
//what is a person is not of a special care category?
//severity highest priority, then specialCareCategory, then age
let score = 0;
if(severity == 3) {
    if(specialCareCategory == 0) { //pediatric patients
        score = 5;
    }
    else if(specialCareCategory == 1) { //first responders/healthcare workers
        score = 4.9;
    }
    else if(specialCareCategory == 2) { //single caretakers
       score = 4.8;
    }
    else if(specialCareCategory == 3) { //pregnant patients
       score = 4.7;
    }
    else if(specialCareCategory == 4) { //short-term survival patients
       score = 4.6;
    }
    else {
        if(age <= 18) {
            score = 5;
        }
        else if(age >= 65) {
            score = 4.5;
        }
        else {
            score = 4.4;
        }
    }
}
else if(severity == 2) {
    if(specialCareCategory == 0) { //pediatric patients
        score = 4.3;
    }
    else if(specialCareCategory == 1) { //first responders/healthcare workers
        score = 4.2;
    }
    else if(specialCareCategory == 2) { //single caretakers
       score = 4.1;
    }
    else if(specialCareCategory == 3) { //pregnant patients
       score = 4;
    }
    else if(specialCareCategory == 4) { //short-term survival patients
       score = 3.9;
    }
    else {
        if(age <= 18) {
            score = 3.8;
        }
        else if(age >= 65) {
            score = 3.7;
        }
        else {
            score = 3.6;
        }
    }
}
else if(severity == 1) {
    if(specialCareCategory == 0) { //pediatric patients
        score = 3.5;
    }
    else if(specialCareCategory == 1) { //first responders/healthcare workers
        score = 3.4;
    }
    else if(specialCareCategory == 2) { //single caretakers
       score = 3.3;
    }
    else if(specialCareCategory == 3) { //pregnant patients
       score = 3.2;
    }
    else if(specialCareCategory == 4) { //short-term survival patients
       score = 3.1;
    }
    else {
        if(age <= 18) {
            score = 3;
        }
        else if(age >= 65) {
            score = 2.9;
        }
        else {
            score = 2.8;
        }
    }
}
else {
    score = 0; //SCORE SHOULD NEVER BE 0; each patient should be assigned a severity score when they are pushed into our system
    //to test if function works properly
}
return score;
}