export const getHealthInfo = async (req, res, next) => {
  try {
    const healthInfo = {
      success: true,
      data: {
        sections: [
          {
            title: 'Physical Activity',
            icon: 'activity',
            content: 'Adults should aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity activity per week. This translates to approximately 7,000-10,000 steps per day.',
            recommendations: [
              'Take regular breaks from sitting',
              'Use stairs instead of elevators',
              'Walk or bike for short trips',
              'Join group fitness classes'
            ]
          },
          {
            title: 'Sleep Health',
            icon: 'moon',
            content: 'Most adults need 7-9 hours of quality sleep per night. Good sleep is essential for physical health, mental well-being, and overall quality of life.',
            recommendations: [
              'Maintain a consistent sleep schedule',
              'Create a relaxing bedtime routine',
              'Keep your bedroom cool and dark',
              'Avoid screens 1 hour before bed'
            ]
          },
          {
            title: 'Hydration',
            icon: 'droplet',
            content: 'Proper hydration is crucial for maintaining body temperature, keeping joints lubricated, preventing infections, and keeping organs functioning properly. Aim for 8 glasses (64 ounces) of water daily.',
            recommendations: [
              'Start your day with a glass of water',
              'Carry a reusable water bottle',
              'Drink water before, during, and after exercise',
              'Eat water-rich foods like fruits and vegetables'
            ]
          },
          {
            title: 'Nutrition',
            icon: 'apple',
            content: 'A balanced diet rich in fruits, vegetables, whole grains, lean proteins, and healthy fats supports overall health.',
            recommendations: [
              'Eat a variety of colorful fruits and vegetables',
              'Choose whole grains over refined grains',
              'Limit processed foods and added sugars',
              'Practice portion control'
            ]
          }
        ],
        lastUpdated: new Date().toISOString()
      }
    };

    res.status(200).json(healthInfo);
  } catch (error) {
    next(error);
  }
};

export const getPrivacyPolicy = async (req, res, next) => {
  try {
    const privacyPolicy = {
      success: true,
      data: {
        title: 'Privacy Policy',
        lastUpdated: '2024-01-01',
        sections: [
          {
            title: 'Data Protection',
            icon: 'shield',
            content: 'We are committed to protecting your health information. All data is encrypted both in transit and at rest using industry-standard encryption protocols. We follow HIPAA compliance guidelines to ensure your protected health information (PHI) remains secure.'
          },
          {
            title: 'Information We Collect',
            icon: 'lock',
            content: 'We collect account information (username, email, role), health metrics (steps, sleep, water intake), profile information you choose to provide, and usage data to improve our service.'
          },
          {
            title: 'How We Use Your Data',
            icon: 'eye',
            content: 'Your data is used to provide and maintain our service, enable healthcare providers to monitor patient compliance, generate health insights and summaries, improve our platform, and communicate important updates.'
          },
          {
            title: 'Your Rights',
            icon: 'file-text',
            content: 'You have the right to access your personal and health data, request corrections, delete your account and associated data, export your health data, and opt-out of non-essential communications.',
            rights: [
              'Access your data',
              'Request corrections',
              'Delete your account',
              'Export your data',
              'Opt-out of communications'
            ]
          }
        ],
        contact: {
          email: 'privacy@healthcompliance.com',
          message: 'For questions about our privacy practices, please contact us.'
        }
      }
    };

    res.status(200).json(privacyPolicy);
  } catch (error) {
    next(error);
  }
};
