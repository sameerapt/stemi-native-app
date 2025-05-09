import { useEffect, useState } from 'react';

export const usePatientData = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    // Simulated API call
    const mockData = [
      {
        title: 'Pointline Review',
        data: [{
          name: 'Graham Bell',
          caseId: '1234565',
          time: '6 min 13 sec',
          facility: 'Cyprus Hospital',
          timeStamp: '12:40AM, 12:37/23'
        }]
      },
      {
        title: 'Unclear Review',
        data: [{
          name: 'Alicia Peterson',
          caseId: '1234565',
          time: '6 min 13 sec',
          facility: 'Cyprus Hospital',
          timeStamp: '12:40AM, 12:47/23'
        }]
      }
    ];
    
    setSections(mockData);
  }, []);

  return { sections };
};