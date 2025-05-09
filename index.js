//1
function FeatureToggle(featureName, isEnabled, userGroupAccess) {
	this.featureName = featureName;
	this.isEnabled = isEnabled;
	this.userGroupAccess = userGroupAccess;
}

FeatureToggle.prototype.canAccess = function(userRole) {
	return this.isEnabled && this.userGroupAccess.includes(userRole);
};

FeatureToggle.prototype.toggleFeature = function(flag) {
	this.isEnabled = flag;
};

const featureA = new FeatureToggle("NewDashboard", true, ["betaTesters", "admins"]);

const userRoles = ["betaTesters", "users", "admins", "guests"];

userRoles.forEach(role => {
	if (featureA.canAccess(role)) {
    	console.log(`${role} can access ${featureA.featureName}`);
	} else {
    	console.log(`${role} cannot access ${featureA.featureName}`);
	}
});



//2

function TimeLog(freelancerName, projectDetails) {
	this.freelancerName = freelancerName;
	this.projectDetails = projectDetails;
	this.logs = [];
}

TimeLog.prototype.addLog = function(date, hoursWorked) {
	this.logs.push({ date, hoursWorked });
};

TimeLog.prototype.calculateTotalEarnings = function() {
	let total = 0;
	this.logs.forEach(log => {
    	total += log.hoursWorked * this.projectDetails.hourlyRate;
	});
	return total;
};

TimeLog.prototype.filterLogsByDateRange = function(startDate, endDate) {
	return this.logs.filter(log => {
    	const logDate = new Date(log.date);
    	return logDate >= new Date(startDate) && logDate <= new Date(endDate);
	});
};

TimeLog.prototype.checkWeeklyHours = function() {
	const weeklyHours = {};
	this.logs.forEach(log => {
    	const weekStart = new Date(log.date);
    	weekStart.setDate(weekStart.getDate() - weekStart.getDay()); 
    	const weekKey = weekStart.toDateString();
    	weeklyHours[weekKey] = (weeklyHours[weekKey] || 0) + log.hoursWorked;
	});

	for (const week in weeklyHours) {
    	if (weeklyHours[week] > 40) {
        	console.log(`Week starting ${week} exceeds 40 hours`)
    	}
        else{
            console.log(`week starting ${week} not exceed 40 hours`)
        }
	}
};
const log = new TimeLog("Alice", { name: "Web Dev", hourlyRate: 50 });
log.addLog("2025-07-01", 10);
log.addLog("2025-07-01", 35);
console.log(log.calculateTotalEarnings); 
console.log(log.filterLogsByDateRange("2025-07-01", "2025-07-01"));
console.log(log.checkWeeklyHours()); 



//3

function Order(customer, items, status) {
	this.customer = customer;
	this.items = items;
	this.status = status;
}

Order.prototype.computeTotalCost = function() {
	return this.items.reduce((total, item) => {
    	return total + (item.quantity * item.unitPrice);
	}, 0);
};

Order.prototype.updateOrderStatus = function(paymentReceived) {
	if (paymentReceived) {
    	this.status = 'Paid';
	} else {
    	this.status = 'Pending Payment';
	}
};

Order.prototype.categorizeUrgency = function() {
	const totalCost = this.computeTotalCost();
	switch (true) {
    	case totalCost > 1000:
        	return 'High Urgency';
    	case totalCost > 500:
        	return 'Medium Urgency';
    	default:
        	return 'Low Urgency';
	}
}
const order = new Order(
    { name: "John Doe", email: "john@example.com" },
    [{ productName: "Laptop", quantity: 2, unitPrice: 1000 }],
    "Pending"
);
console.log(order.computeTotalCost()); 
order.updateOrderStatus(true);
console.log(order.status); 
console.log(order.categorizeUrgency()); 


//4

class Employee {
    constructor(id, name, performanceMetrics, feedback) {
        this.id = id;
        this.name = name;
        this.performanceMetrics = performanceMetrics;
        this.feedback = feedback;
    }
    calculateAverageScore() {
        const metrics = Object.values(this.performanceMetrics);
        const total = metrics.reduce((sum, score) => sum + score, 0);
        return total / metrics.length;
    }
    classifyPerformanceLevel() {
        const averageScore = this.calculateAverageScore();
        if (averageScore >= 85) {
            return 'Excellent';
        } else if (averageScore >= 70) {
            return 'Good';
        } else if (averageScore >= 50) {
            return 'Satisfactory';
        } else {
            return 'Needs Improvement';
        }
    }
    addFeedback(newFeedback) {
        if (newFeedback && typeof newFeedback === 'string') {
            this.feedback.push(newFeedback);
        }
    }
}
const person1= new Employee("Tihitna", 190,
    {communication: 50, efficiency:100, reliability:100},
    ["good job", "well done", "excellent", "needs improvement"]);
    console.log(person1.addFeedback(["bad","sorry"]));
    console.log(person1.calculateAverageScore());
    console.log(person1.classifyPerformanceLevel());
    console.log(person1.calculateAverageScore());







//5



class Course {
    constructor(title, instructor) {
        this.title = title;
        this.instructor = instructor;
        this.students = [];
    }
    addStudent(student) {
        this.students.push(student);
    }
    getCompletedStudents() {
        return this.students.filter(student => student.completionStatus).map(student => student.name);
    }
    countStudentsByExpertise() {
        const expertiseCount = {};
        this.students.forEach(student => {
            const expertise = this.instructor.expertise;
            expertiseCount[expertise] = (expertiseCount[expertise] || 0) + 1;
        });
        return expertiseCount;
    }
    instructorMessage() {
        const studentCount = this.students.length;
        if (studentCount > 5) {
            return `${this.instructor.name}, good job! You have more than 5 students.`;
        } else {
            return `${this.instructor.name}, exelent! You have ${studentCount} students.`;
        }
    }
}




const course= new Course("Backend","Jems"
   ,  [{name: "Alex", completionStatus:true}, {name: "Sami", completionStatus:false},
        {name: "Berket", completionStatus:true}  ]
);
