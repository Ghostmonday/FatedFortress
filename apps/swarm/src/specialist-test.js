const SPECIALTY_MULTIPLIER = 1.5;
const ROLE_MULTIPLIER = 1.5;
const hasSpecialty = (xp, targetDomain) => {
    for (const roleHistory of Object.values(xp.roleHistory)) {
        if (roleHistory[targetDomain] && roleHistory[targetDomain] > 0) {
            return true;
        }
    }
    return false;
};
const getEffectiveScore = (xp, roleXP, targetDomain) => {
    let score = roleXP;
    if (roleXP > 0) {
        score *= ROLE_MULTIPLIER;
    }
    if (targetDomain && hasSpecialty(xp, targetDomain)) {
        score *= SPECIALTY_MULTIPLIER;
    }
    return score;
};
const createGeneralist = () => {
    const userId = 'generalist-alice';
    return {
        userId,
        name: 'Generalist Alice',
        xpVector: {
            totalXP: 100,
            pendingXP: 0,
            execution: 50, // Lower execution XP
            collaboration: 30,
            judgment: 20,
            roleHistory: {
                BUILDER: { FRONTEND: 25, BACKEND: 25 }, // Some BACKEND XP
            },
            lastActivity: new Date()
        }
    };
};
const createSpecialist = () => {
    const userId = 'specialist-bob';
    return {
        userId,
        name: 'Specialist Bob',
        xpVector: {
            totalXP: 80, // Lower total XP
            pendingXP: 0,
            execution: 80, // Higher execution XP
            collaboration: 0,
            judgment: 0,
            roleHistory: {
                BUILDER: { BACKEND: 80 } // Deep BACKEND specialization
            },
            lastActivity: new Date()
        }
    };
};
const runSpecialistTest = () => {
    console.log('=== Chapter 070: Specialist Swarm Test ===\n');
    const generalist = createGeneralist();
    const specialist = createSpecialist();
    console.log('Generalist Alice:');
    console.log(`  - Total XP: ${generalist.xpVector.totalXP}`);
    console.log(`  - Execution XP: ${generalist.xpVector.execution}`);
    console.log(`  - Role History:`, JSON.stringify(generalist.xpVector.roleHistory));
    console.log('');
    console.log('Specialist Bob:');
    console.log(`  - Total XP: ${specialist.xpVector.totalXP}`);
    console.log(`  - Execution XP: ${specialist.xpVector.execution}`);
    console.log(`  - Role History:`, JSON.stringify(specialist.xpVector.roleHistory));
    console.log('');
    // Calculate BUILDER scores for BACKEND project
    const targetDomain = 'BACKEND';
    console.log('--- BUILDER Scoring for BACKEND Project ---');
    const generalistScore = getEffectiveScore(generalist.xpVector, generalist.xpVector.execution, targetDomain);
    const specialistScore = getEffectiveScore(specialist.xpVector, specialist.xpVector.execution, targetDomain);
    console.log(`Generalist Alice: ${generalist.xpVector.execution} XP × ${ROLE_MULTIPLIER} (role) × ${hasSpecialty(generalist.xpVector, targetDomain) ? SPECIALTY_MULTIPLIER : '1.0'} (specialty) = ${generalistScore}`);
    console.log(`Specialist Bob:   ${specialist.xpVector.execution} XP × ${ROLE_MULTIPLIER} (role) × ${hasSpecialty(specialist.xpVector, targetDomain) ? SPECIALTY_MULTIPLIER : '1.0'} (specialty) = ${specialistScore}`);
    console.log('');
    // Determine winner
    console.log('--- Result ---');
    if (specialistScore > generalistScore) {
        console.log(`✅ PASS: Specialist Bob wins with ${specialistScore.toFixed(2)} vs ${generalistScore.toFixed(2)}`);
        console.log('   The 1.5x specialty multiplier favors the specialist with matching domain!');
        return true;
    }
    else {
        console.log(`❌ FAIL: Generalist Alice wins with ${generalistScore.toFixed(2)} vs ${specialistScore.toFixed(2)}`);
        return false;
    }
};
// Export for use in swarm
export { runSpecialistTest, createGeneralist, createSpecialist };
// Run if executed directly
if (require.main === module) {
    const success = runSpecialistTest();
    process.exit(success ? 0 : 1);
}
//# sourceMappingURL=specialist-test.js.map