import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const NeuralBackground = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let pipelines = [];
    let testCases = [];
    let animationFrameId;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Create CI/CD pipelines with random speeds and offsets
      pipelines = Array.from({ length: 5 }, (_, i) => ({
        x: (canvas.width * (i + 1)) / 6,
        stages: ['Analyze', 'Generate', 'Execute'],
        currentStage: Math.floor(Math.random() * 3),
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004, // Random speed for each pipeline
        pulseIntensity: 0.5 + Math.random() * 0.5 // Random pulse intensity
      }));

      // Create test cases with automation-focused types
      testCases = Array.from({ length: 20 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        type: ['UI Test', 'API Test', 'Flow Test'][Math.floor(Math.random() * 3)],  // Updated test types
        status: 'pending',
        size: 4,
        pulse: 0
      }));
    };

    const drawPipeline = (pipeline) => {
      const height = canvas.height * 0.8;
      const stageHeight = height / pipeline.stages.length;
      
      pipeline.stages.forEach((stage, i) => {
        const y = canvas.height * 0.1 + (stageHeight * i);
        
        // Add randomized flowing dots
        for (let j = 0; j < 5; j++) {
          const dotOffset = ((pipeline.progress + (j * 0.2)) % 1) * stageHeight;
          const dotY = y + dotOffset;
          
          if (dotY >= y && dotY <= y + stageHeight) {
            ctx.beginPath();
            ctx.arc(pipeline.x, dotY, 2, 0, Math.PI * 2);
            ctx.fillStyle = theme === 'dark' 
              ? `rgba(46,213,115,${0.4 + Math.sin(pipeline.progress * Math.PI * 2) * 0.2 * pipeline.pulseIntensity})` 
              : `rgba(147,51,234,${0.4 + Math.sin(pipeline.progress * Math.PI * 2) * 0.2 * pipeline.pulseIntensity})`;
            ctx.fill();
          }
        }

        // Draw stage connection
        ctx.beginPath();
        ctx.strokeStyle = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(147,51,234,0.1)';
        ctx.lineWidth = 2;
        ctx.moveTo(pipeline.x, y);
        ctx.lineTo(pipeline.x, y + stageHeight);
        ctx.stroke();

        // Draw stage node
        ctx.beginPath();
        const isCurrentStage = i === pipeline.currentStage;
        const radius = isCurrentStage ? 8 : 6;
        ctx.arc(pipeline.x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = isCurrentStage
          ? theme === 'dark' ? 'rgba(46,213,115,0.8)' : 'rgba(46,213,115,0.8)'
          : theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(147,51,234,0.3)';
        ctx.fill();

        // Stage label
        ctx.font = '10px monospace';
        ctx.fillStyle = theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(147,51,234,0.5)';
        ctx.fillText(stage, pipeline.x + 15, y + 4);
      });

      // Update pipeline with random progression
      pipeline.progress += pipeline.speed;
      if (pipeline.progress >= 1) {
        pipeline.progress = 0;
        pipeline.currentStage = (pipeline.currentStage + 1) % pipeline.stages.length;
        pipeline.speed = 0.003 + Math.random() * 0.004; // New random speed for next cycle
      }
    };

    const drawTestCase = (test) => {
      // Pulse effect
      test.pulse = (test.pulse + 0.05) % (Math.PI * 2);
      const pulseSize = Math.sin(test.pulse) * 2;

      ctx.beginPath();
      ctx.arc(test.x, test.y, test.size + pulseSize, 0, Math.PI * 2);
      
      const colors = {
        pending: theme === 'dark' ? '255,255,255' : '147,51,234',
        running: '46,213,115',
        failed: '255,71,87'
      };

      const color = colors[test.status];
      ctx.fillStyle = `rgba(${color},${0.3 + Math.abs(Math.sin(test.pulse) * 0.5)})`;
      ctx.fill();

      // Test type label
      ctx.font = '8px monospace';
      ctx.fillStyle = theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(147,51,234,0.6)';
      ctx.fillText(test.type, test.x - 10, test.y - 10);

      // Randomly change test status
      if (Math.random() < 0.01) {
        test.status = ['pending', 'running', 'failed'][Math.floor(Math.random() * 3)];
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      pipelines.forEach(drawPipeline);
      testCases.forEach(drawTestCase);

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => init();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default NeuralBackground;
