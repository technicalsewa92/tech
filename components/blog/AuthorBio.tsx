import React from 'react';
import { FiInfo } from 'react-icons/fi';

interface AuthorBioProps {
  name?: string;
  bio?: string;
  className?: string;
}

const AuthorBio: React.FC<AuthorBioProps> = ({
  name = 'Technicalsewa',
  bio = 'Technical Sewa expert with years of experience in the field.',
  className = '',
}) => {
  return (
    <div
      className={`bg-[#2591b2]/10 rounded-lg p-6 border border-[#2591b2]/20 ${className}`}
    >
      <div className="flex items-start gap-3">
        <FiInfo className="text-[#2591b2] w-6 h-6 mt-1 flex-shrink-0" />

        <div>
          <h3 className="text-lg font-semibold text-[#2591b2] mb-2">
            About the Author
          </h3>
          <h4 className="font-medium text-[#2591b2]">{name}</h4>
          {bio && <p className="text-gray-600 mt-2 text-sm">{bio}</p>}
        </div>
      </div>
    </div>
  );
};

export default AuthorBio;
