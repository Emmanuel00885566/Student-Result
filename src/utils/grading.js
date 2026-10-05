export const calculateResult = ({ ca1, ca2, ca3, examScore, gradeScales }) => {
  const totalScore = (ca1 || 0) + (ca2 || 0) + (ca3 || 0) + (examScore || 0);

  const matchedGrade = gradeScales.find(
    (g) => totalScore >= g.minScore && totalScore <= g.maxScore
  );

  return {
    totalScore,
    grade: matchedGrade ? matchedGrade.grade : null,
    remark: matchedGrade ? matchedGrade.remark : null,
  };
};