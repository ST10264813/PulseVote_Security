import React, { useEffect } from 'react';

const CSPTest = () => {
  useEffect(() => {
    // Listen for CSP violation events
    const handleCSPViolation = (e) => {
      console.log('CSP Violation:', {
        directive: e.violatedDirective,
        blockedURI: e.blockedURI,
        originalPolicy: e.originalPolicy
      });
    };

    document.addEventListener('securitypolicyviolation', handleCSPViolation);

    return () => {
      document.removeEventListener('securitypolicyviolation', handleCSPViolation);
    };
  }, []);

  // 1. Script Violations
  const loadExternalScript = () => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js';
    script.onload = () => {
      document.getElementById('script-result').innerHTML = '✅ Script loaded successfully (CSP not working)';
    };
    script.onerror = () => {
      document.getElementById('script-result').innerHTML = '❌ Script blocked by CSP (working correctly)';
    };
    document.head.appendChild(script);
  };

  const executeInlineScript = () => {
    try {
      eval('console.log("This eval should be blocked by CSP")');
      document.getElementById('script-result').innerHTML = '✅ Eval executed (CSP not working)';
    } catch (e) {
      document.getElementById('script-result').innerHTML = '❌ Eval blocked by CSP: ' + e.message;
    }
  };

  // 2. Style Violations
  const loadExternalCSS = () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/css/bootstrap.min.css';
    link.onload = () => {
      document.getElementById('style-result').innerHTML = '✅ CSS loaded successfully (CSP not working)';
    };
    link.onerror = () => {
      document.getElementById('style-result').innerHTML = '❌ CSS blocked by CSP (working correctly)';
    };
    document.head.appendChild(link);
  };

  // 3. Image Violations
  const loadExternalImage = () => {
    const img = document.createElement('img');
    img.src = 'https://picsum.photos/200/100';
    img.style.maxWidth = '200px';
    img.onload = () => {
      document.getElementById('image-result').innerHTML = '✅ Image loaded successfully (CSP not working)';
    };
    img.onerror = () => {
      document.getElementById('image-result').innerHTML = '❌ Image blocked by CSP (working correctly)';
    };
    const container = document.getElementById('image-container');
    if (container) {
      container.appendChild(img);
    }
  };

  // 4. Font Violations
  const loadUnauthorizedFont = () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    link.onload = () => {
      document.getElementById('font-result').innerHTML = '✅ Font loaded successfully (CSP not working)';
    };
    link.onerror = () => {
      document.getElementById('font-result').innerHTML = '❌ Font blocked by CSP (working correctly)';
    };
    document.head.appendChild(link);
  };

  // 5. Connection Violations
  const fetchFromExternalAPI = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(data => {
        document.getElementById('connection-result').innerHTML = '✅ External API call successful (CSP not working)';
      })
      .catch(error => {
        document.getElementById('connection-result').innerHTML = '❌ External API blocked by CSP: ' + error.message;
      });
  };

  const connectToWebSocket = () => {
    try {
      const ws = new WebSocket('wss://echo.websocket.org/');
      ws.onopen = () => {
        document.getElementById('connection-result').innerHTML = '✅ WebSocket connected (CSP not working)';
        ws.close();
      };
      ws.onerror = (error) => {
        document.getElementById('connection-result').innerHTML = '❌ WebSocket blocked by CSP';
      };
    } catch (error) {
      document.getElementById('connection-result').innerHTML = '❌ WebSocket blocked by CSP: ' + error.message;
    }
  };

  // 6. Frame Violations
  const loadExternalFrame = () => {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.example.com';
    iframe.width = '300';
    iframe.height = '200';
    iframe.style.border = '1px solid #ccc';
    iframe.onload = () => {
      document.getElementById('frame-result').innerHTML = '✅ iframe loaded successfully (CSP not working)';
    };
    iframe.onerror = () => {
      document.getElementById('frame-result').innerHTML = '❌ iframe blocked by CSP (working correctly)';
    };
    const container = document.getElementById('frame-container');
    if (container) {
      container.appendChild(iframe);
    }
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px'
    },
    testSection: {
      margin: '20px 0',
      padding: '15px',
      border: '1px solid #ddd',
      borderRadius: '8px'
    },
    violationButton: {
      backgroundColor: '#ff6b6b',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      margin: '5px',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    testResult: {
      marginTop: '10px',
      padding: '10px',
      borderRadius: '4px',
      backgroundColor: '#f5f5f5'
    },
    consoleNote: {
      backgroundColor: '#e3f2fd',
      border: '1px solid #2196f3',
      padding: '10px',
      borderRadius: '4px',
      margin: '10px 0'
    }
  };

  return (
    <div style={styles.container}>
      <h1>🛡️ CSP Violation Testing</h1>
      
      <div style={styles.consoleNote}>
        <strong>📝 Note:</strong> Open your browser's developer console (F12) to see CSP violation errors when you click the buttons below.
      </div>

      <div style={styles.testSection}>
        <h2>1. Script Violations</h2>
        <p>These will violate the <code>script-src</code> policy:</p>
        
        <button 
          style={styles.violationButton} 
          onClick={loadExternalScript}
          onMouseOver={(e) => e.target.style.backgroundColor = '#ff5252'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b6b'}
        >
          Load Script from Unauthorized CDN
        </button>
        
        <button 
          style={styles.violationButton} 
          onClick={executeInlineScript}
          onMouseOver={(e) => e.target.style.backgroundColor = '#ff5252'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b6b'}
        >
          Execute Inline Script (eval)
        </button>
        
        <div id="script-result" style={styles.testResult}></div>
      </div>

      <div style={styles.testSection}>
        <h2>2. Style Violations</h2>
        <p>These will violate the <code>style-src</code> policy:</p>
        
        <button 
          style={styles.violationButton} 
          onClick={loadExternalCSS}
          onMouseOver={(e) => e.target.style.backgroundColor = '#ff5252'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b6b'}
        >
          Load CSS from Unauthorized Source
        </button>
        
        <div id="style-result" style={styles.testResult}></div>
      </div>

      <div style={styles.testSection}>
        <h2>3. Image Violations</h2>
        <p>These will violate the <code>img-src</code> policy:</p>
        
        <button 
          style={styles.violationButton} 
          onClick={loadExternalImage}
          onMouseOver={(e) => e.target.style.backgroundColor = '#ff5252'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b6b'}
        >
          Load Image from External URL
        </button>
        
        <div id="image-container"></div>
        <div id="image-result" style={styles.testResult}></div>
      </div>

      <div style={styles.testSection}>
        <h2>4. Font Violations</h2>
        <p>These will violate the <code>font-src</code> policy:</p>
        
        <button 
          style={styles.violationButton} 
          onClick={loadUnauthorizedFont}
          onMouseOver={(e) => e.target.style.backgroundColor = '#ff5252'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b6b'}
        >
          Load Font from Unauthorized CDN
        </button>
        
        <div id="font-result" style={styles.testResult}></div>
      </div>

      <div style={styles.testSection}>
        <h2>5. Connection Violations</h2>
        <p>These will violate the <code>connect-src</code> policy:</p>
        
        <button 
          style={styles.violationButton} 
          onClick={fetchFromExternalAPI}
          onMouseOver={(e) => e.target.style.backgroundColor = '#ff5252'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b6b'}
        >
          Fetch from External API
        </button>
        
        <button 
          style={styles.violationButton} 
          onClick={connectToWebSocket}
          onMouseOver={(e) => e.target.style.backgroundColor = '#ff5252'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b6b'}
        >
          Connect to External WebSocket
        </button>
        
        <div id="connection-result" style={styles.testResult}></div>
      </div>

      <div style={styles.testSection}>
        <h2>6. Frame Violations</h2>
        <p>These will violate the default <code>frame-src</code> policy:</p>
        
        <button 
          style={styles.violationButton} 
          onClick={loadExternalFrame}
          onMouseOver={(e) => e.target.style.backgroundColor = '#ff5252'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b6b'}
        >
          Load External iframe
        </button>
        
        <div id="frame-container"></div>
        <div id="frame-result" style={styles.testResult}></div>
      </div>
    </div>
  );
};

export default CSPTest;