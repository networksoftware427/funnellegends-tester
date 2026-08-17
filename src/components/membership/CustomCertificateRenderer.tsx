import React from 'react';
import { CustomBuiltCertificate } from '../../types/certificate';

interface CustomCertificateRendererProps {
  certificate: CustomBuiltCertificate;
  studentName: string;
  courseTitle: string;
  completionDate?: string;
}

export const CustomCertificateRenderer: React.FC<CustomCertificateRendererProps> = ({
  certificate,
  studentName,
  courseTitle,
  completionDate = new Date().toLocaleDateString()
}) => {
  return (
    <div 
      className="relative w-full max-w-4xl shadow-2xl overflow-hidden ring-1 ring-slate-800"
      style={{ 
        aspectRatio: '1.414 / 1', 
        backgroundColor: certificate.bgColor,
        backgroundImage: certificate.bgImageUrl ? `url(${certificate.bgImageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Elements */}
      {certificate.elements.map(el => {
        
        let displayContent = el.content;
        if (el.type === 'variable') {
          if (el.content === '{{Student Name}}') displayContent = studentName || 'Sarah Connor';
          else if (el.content === '{{Course Title}}') displayContent = courseTitle || 'Course Name';
          else if (el.content === '{{Completion Date}}') displayContent = completionDate;
        }

        return (
          <div
            key={el.id}
            className="absolute"
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              color: el.color,
              fontSize: `${el.fontSize}px`,
              fontFamily: el.fontFamily,
              fontWeight: el.fontWeight,
              textAlign: el.textAlign,
              width: el.width ? `${el.width}%` : 'auto',
              height: el.height ? `${el.height}%` : 'auto',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {el.type === 'image' ? (
              <img src={displayContent} alt="Element" className="max-w-full" draggable={false} />
            ) : el.type === 'variable' ? (
              <span style={{ whiteSpace: 'nowrap' }}>{displayContent}</span>
            ) : (
              <div style={{ whiteSpace: 'pre-wrap' }}>{displayContent}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};
