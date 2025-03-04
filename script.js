// Define vocational groups data (currently not used directly in UI)
const vocationalGroups = {
  '機械群': ['機械科', '鑄造科', '板金科', '機械木模科', '配管科', '模具科', '機電科', '製圖科', '生物產業機電科', '電腦機械製圖科'],
  '動力機械群': ['汽車科', '重機科', '飛機修護科', '動力機械科', '農業機械科', '軌道車輛科'],
  '電機與電子群': ['資訊科', '電子科', '控制科', '電機科', '冷凍空調科', '航空電子科', '電機空調科'],
  '化工群': ['化工科', '紡織科', '染整科'],
  '土木與建築群': ['建築科', '土木科', '消防工程科', '空間測繪科'],
  '商業與管理群': ['商業經營科', '國際貿易科', '會計事務科', '資料處理科', '不動產事務科', '電子商務科', '流通管理科', '農產行銷科', '航運管理科'],
  '外語群': ['應用外語科（英文組）', '應用外語科（日文組）'],
  '設計群': ['家具木工科', '美工科', '陶瓷工程科', '室內空間設計科', '圖文傳播科', '金屬工藝科', '家具設計科', '廣告設計科', '多媒體設計科', '多媒體應用科', '室內設計科'],
  '農業群': ['農場經營科', '園藝科', '森林科', '野生動物保育科', '造園科', '畜產保健科'],
  '食品群': ['食品加工科', '食品科', '水產食品科', '烘焙科'],
  '家政群': ['家政科', '服裝科', '幼兒保育科', '美容科', '時尚模特兒科', '流行服飾科', '時尚造型科', '照顧服務科'],
  '餐旅群': ['觀光事業科', '餐飲管理科']
};

function toggleVocationalGroup() {
  const schoolType = document.getElementById('schoolType').value;
  const vocationalGroupContainer = document.getElementById('vocationalGroupContainer');
  const vocationalGroup = document.getElementById('vocationalGroup');

  if (schoolType === '職業類科') {
    vocationalGroupContainer.style.display = 'block';
  } else {
    vocationalGroupContainer.style.display = 'none';
    vocationalGroup.value = 'all';
  }
}

function toggleInstructions() {
  var instructions = document.getElementById('instructions');
  if (instructions.style.display === 'none' || instructions.style.display === '') {
    instructions.style.display = 'block';
    instructions.style.animation = 'fadeIn 0.5s ease-out';
  } else {
    instructions.style.animation = 'fadeOut 0.5s ease-out';
    setTimeout(() => {
      instructions.style.display = 'none';
    }, 500);
  }
}

let isDragging = false;
let startY;
let startTop;

function showDisclaimer() {
  var modal = document.getElementById('disclaimerModal');
  var modalContent = modal.querySelector('.modal-content');
  modal.style.display = 'block';

  modalContent.addEventListener('mousedown', startDragging);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDragging);

  modalContent.addEventListener('touchstart', startDragging);
  document.addEventListener('touchmove', drag);
  document.addEventListener('touchend', stopDragging);
}

function startDragging(e) {
  isDragging = true;
  startY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
  startTop = parseInt(window.getComputedStyle(this).top) || 0;
  this.style.cursor = 'grabbing';
}

function drag(e) {
  if (!isDragging) return;
  e.preventDefault();
  let modalContent = document.querySelector('.modal-content');
  let currentY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
  let deltaY = currentY - startY;
  modalContent.style.top = `${startTop + deltaY}px`;
}

function stopDragging() {
  isDragging = false;
  const modalContent = document.querySelector('.modal-content');
  if (modalContent) modalContent.style.cursor = 'grab';
}

function closeDisclaimer() {
  var modal = document.getElementById('disclaimerModal');
  modal.style.display = 'none';
}

function showInvitationValidationAnimation() {
  const invitationGroup = document.getElementById('invitationCode').closest('.form-group');
  if (!invitationGroup) return;
  invitationGroup.style.position = 'relative';
  const overlay = document.createElement('div');
  overlay.id = 'invitationValidationOverlay';
  overlay.className = 'validation-overlay';
  overlay.innerHTML = `
    <div class="validation-spinner"></div>
    <div class="validation-text">驗證邀請碼中...</div>
  `;
  invitationGroup.appendChild(overlay);
}

function hideInvitationValidationAnimation() {
  const overlay = document.getElementById('invitationValidationOverlay');
  if (overlay) {
    overlay.remove();
  }
}

function showLoading() {
  const loadingOverlay = document.createElement('div');
  loadingOverlay.className = 'loading-overlay';
  loadingOverlay.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <div class="progress-container">
        <div class="progress-bar"></div>
      </div>
      <div class="loading-text">分析您的會考成績中</div>
    </div>
  `;
  document.body.appendChild(loadingOverlay);

  requestAnimationFrame(() => {
    loadingOverlay.style.display = 'flex';
    loadingOverlay.style.opacity = '0';
    requestAnimationFrame(() => {
      loadingOverlay.style.transition = 'opacity 0.3s ease';
      loadingOverlay.style.opacity = '1';
    });
  });
  
  // Cycle through different loading messages
  let loadingMessages = [
    "分析您的會考成績中",
    "搜尋符合的學校中",
    "計算落點數據中",
    "整理分析結果中"
  ];
  
  let messageIndex = 0;
  const messageInterval = setInterval(() => {
    messageIndex = (messageIndex + 1) % loadingMessages.length;
    const loadingTextElement = loadingOverlay.querySelector('.loading-text');
    if (loadingTextElement) {
      loadingTextElement.textContent = loadingMessages[messageIndex];
    }
  }, 1500);
  
  // Store the interval ID on the overlay element so we can clear it later
  loadingOverlay.messageInterval = messageInterval;
}

function hideLoading() {
  const loadingOverlay = document.querySelector('.loading-overlay');
  if (loadingOverlay) {
    // Clear the message cycling interval
    if (loadingOverlay.messageInterval) {
      clearInterval(loadingOverlay.messageInterval);
    }
    
    loadingOverlay.style.opacity = '0';
    setTimeout(() => {
      loadingOverlay.remove();
    }, 300);
  }
}

async function logUserActivity(action, details = {}) {
  try {
    const userAgent = navigator.userAgent;
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const viewportSize = `${window.innerWidth}x${window.innerHeight}`;
    const timestamp = new Date().toISOString();

    const data = {
      timestamp,
      action,
      userAgent,
      screenResolution,
      viewportSize,
      darkMode: document.body.classList.contains('dark-mode'),
      ...details
    };

    const response = await fetch('https://script.google.com/macros/s/AKfycbxDE3AOZdrHcfUHjgs2TIORzWJOOZAH02FY7bf375SPKmGpEiG1qXEVsUASaWL3LWU/exec', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to log activity');
    }
  } catch (error) {
    console.error('Error logging activity:', error);
  }
}

async function analyzeScores() {
  const analyzeButton = document.getElementById('analyzeButton');
  let originalButtonText = '';
  if (analyzeButton) {
    originalButtonText = analyzeButton.innerHTML;
    analyzeButton.disabled = true;
    analyzeButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 驗證中...';
  }

  try {
    const invitationCode = document.getElementById('invitationCode').value;
    if (invitationCode.trim() === "") {
      alert("請填寫邀請碼");
      if (analyzeButton) {
        analyzeButton.disabled = false;
        analyzeButton.innerHTML = originalButtonText;
      }
      return;
    }

    showInvitationValidationAnimation();
    let validationResponse;
    try {
      validationResponse = await fetch('https://script.google.com/macros/s/AKfycbwsqIqoZ6_ncUZtpmF80ohHGX-FEqE1JnMz1Y6SQ3GQhtK9SH-HTz_d_w0uloFV-Iyd/exec', {
        method: 'POST',
        body: JSON.stringify({
          action: 'validateInvitationCode',
          invitationCode: invitationCode
        })
      });
    } catch (error) {
      hideInvitationValidationAnimation();
      throw error;
    }
    hideInvitationValidationAnimation();

    if (!validationResponse.ok) {
      throw new Error('邀請碼驗證失敗');
    }

    const validationResult = await validationResponse.json();
    if (!validationResult.valid) {
      alert('邀請碼錯誤或已過期，請確認最新的邀請碼。');
      return;
    }

    const schoolOwnership = document.getElementById('schoolOwnership').value;
    const schoolType = document.getElementById('schoolType').value;
    const vocationalGroup = document.getElementById('vocationalGroup').value;

    const fields = ['chinese', 'english', 'math', 'science', 'social', 'composition'];
    let isAllFieldsFilled = true;
    let emptyFields = [];

    fields.forEach(field => {
      const value = document.getElementById(field).value;
      if (value === "") {
        isAllFieldsFilled = false;
        emptyFields.push(field);
      }
    });

    if (!isAllFieldsFilled) {
      let errorMessage = '請填寫以下欄位會考成績：\n';
      const fieldNames = {
        'chinese': '國文',
        'english': '英文',
        'math': '數學',
        'science': '自然',
        'social': '社會',
        'composition': '作文'
      };
      emptyFields.forEach(field => {
        errorMessage += `- ${fieldNames[field]}\n`;
      });
      alert(errorMessage);
      return;
    }

    showLoading();

    await logUserActivity('analyze_scores', {
      scores: {
        chinese: document.getElementById('chinese').value,
        english: document.getElementById('english').value,
        math: document.getElementById('math').value,
        science: document.getElementById('science').value,
        social: document.getElementById('social').value,
        composition: document.getElementById('composition').value
      },
      filters: {
        schoolOwnership,
        schoolType,
        vocationalGroup
      }
    });

    const scores = {
      chinese: document.getElementById('chinese').value,
      english: document.getElementById('english').value,
      math: document.getElementById('math').value,
      science: document.getElementById('science').value,
      social: document.getElementById('social').value,
      composition: parseInt(document.getElementById('composition').value)
    };

    const response = await fetch('https://script.google.com/macros/s/AKfycbycc6i2_NBLxPa_hPN6EPIbHCS0smnCG9tGUWby4_tLoZdHb3IsqQGNx26LY7OI1yyBKw/exec', {
      method: 'POST',
      body: JSON.stringify({
        scores,
        filters: {
          schoolOwnership,
          schoolType,
          vocationalGroup
        }
      })
    });

    if (!response.ok) {
      throw new Error('無法取得學校資料');
    }

    const data = await response.json();
    displayResults(data);
  } catch (error) {
    await logUserActivity('analyze_error', { error: error.message });
    alert('發生錯誤：' + error.message);
  } finally {
    if (analyzeButton) {
      analyzeButton.disabled = false;
      analyzeButton.innerHTML = originalButtonText;
    }
    hideLoading();
  }
}

function displayResults(data) {
  const { totalPoints, totalCredits, eligibleSchools } = data;
  let resultsHTML = `<div class="results-card">`;
  resultsHTML += `<h2><i class="fas fa-clipboard-check icon"></i> 分析結果</h2>`;
  resultsHTML += `<div class="results-summary">
                    <p class="result-item"><i class="fas fa-star icon"></i> 總積分：${totalPoints}</p>
                    <p class="result-item"><i class="fas fa-award icon"></i> 總積點：${totalCredits}</p>
                  </div>`;
  resultsHTML += `<h3><i class="fas fa-list-ul icon"></i> 可能錄取的學校：</h3>`;
  if (eligibleSchools && eligibleSchools.length > 0) {
    resultsHTML += `<p class="result-item"><i class="fas fa-building icon"></i> 共有 ${eligibleSchools.length} 所學校可能錄取</p>`;
    let groupedSchools = {};
    eligibleSchools.forEach(school => {
      if (!groupedSchools[school.type]) {
        groupedSchools[school.type] = [];
      }
      groupedSchools[school.type].push(school.name);
    });
    Object.entries(groupedSchools).forEach(([type, schools]) => {
      resultsHTML += `<h3>${type} (${schools.length}所)</h3><ul>`;
      schools.forEach(schoolName => {
        resultsHTML += `<li class="result-item"><i class="fas fa-check-circle icon"></i> ${schoolName}</li>`;
      });
      resultsHTML += `</ul>`;
    });
  } else {
    resultsHTML += `<p class="result-item"><i class="fas fa-exclamation-triangle icon"></i> 根據您的成績，暫時沒有符合條件的學校。</p>`;
  }
  let details = `<div class="result-details">
                    <h3><i class="fas fa-info-circle icon"></i> 分析詳細資料</h3>
                    <ul>
                      <li>國文：${document.getElementById('chinese').value}</li>
                      <li>英文：${document.getElementById('english').value}</li>
                      <li>數學：${document.getElementById('math').value}</li>
                      <li>自然：${document.getElementById('science').value}</li>
                      <li>社會：${document.getElementById('social').value}</li>
                      <li>作文：${document.getElementById('composition').value} 級分</li>
                      <li>學校屬性：${document.getElementById('schoolOwnership').value === 'all' ? '全部' : (document.getElementById('schoolOwnership').value === 'public' ? '公立' : '私立')}</li>
                      <li>學校類型：${document.getElementById('schoolType').value}</li>
                      ${document.getElementById('schoolType').value === '職業類科' ? `<li>職業群別：${document.getElementById('vocationalGroup').value}</li>` : ''}
                      <li>分析時間：${new Date().toLocaleString('zh-TW')}</li>
                    </ul>
                  </div>`;
  resultsHTML += details;
  resultsHTML += `</div>`;
  const resultsElement = document.getElementById('results');
  resultsElement.innerHTML = resultsHTML;
  resultsElement.style.display = 'none';
  setTimeout(() => {
    resultsElement.style.display = 'block';
    resultsElement.style.animation = 'fadeIn 0.5s ease-out';
    document.getElementById('exportResults').style.display = 'inline-block';
  }, 100);
}

function exportResults() {
  logUserActivity('export_results');
  const resultsElement = document.getElementById('results');
  const resultsText = resultsElement.innerText;

  const now = new Date();
  const dateTime = now.toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const watermark =
    "********************************\n" +
    "*                              *\n" +
    "*  KHTW 高雄區會考落點分析系統  *\n" +
    "*       以下資料僅供參考      *\n" +
    "*                              *\n" +
    `*   產生時間: ${dateTime}   *\n` +
    "*                              *\n" +
    "********************************\n\n";

  const contentWithWatermark = watermark + resultsText;

  // Show export format selection dialog
  showExportFormatDialog(contentWithWatermark);
}

function showExportFormatDialog(content) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'exportFormatModal';
  modal.style.display = 'block';
  
  modal.innerHTML = `
    <div class="modal-content export-format-modal">
      <span class="close" onclick="closeExportFormatDialog()">&times;</span>
      <h2><i class="fas fa-file-export icon"></i> 選擇匯出格式</h2>
      <div class="export-format-options">
        <button onclick="exportAsFormat('txt', '${encodeURIComponent(content)}')">
          <i class="fas fa-file-alt icon"></i> 純文字檔 (.txt)
        </button>
        <button onclick="exportAsFormat('csv', '${encodeURIComponent(content)}')">
          <i class="fas fa-file-csv icon"></i> CSV 檔案 (.csv)
        </button>
        <button onclick="exportAsFormat('json', '${encodeURIComponent(content)}')">
          <i class="fas fa-file-code icon"></i> JSON 檔案 (.json)
        </button>
        <button onclick="exportAsFormat('html', '${encodeURIComponent(content)}')">
          <i class="fas fa-file-code icon"></i> HTML 檔案 (.html)
        </button>
        <button onclick="printResults()">
          <i class="fas fa-print icon"></i> 列印結果
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
}

function printResults() {
  logUserActivity('print_results');
  closeExportFormatDialog();
  
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  
  // Get data from the results section
  const resultsElement = document.getElementById('results');
  const resultsContent = resultsElement.innerHTML;
  
  // Get current date and time
  const now = new Date();
  const dateTime = now.toLocaleString('zh-TW');
  
  // Create print content with proper styling
  const printContent = `
    <!DOCTYPE html>
    <html lang="zh-TW">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>高雄區會考落點分析結果</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&display=swap');
        
        body {
          font-family: 'Noto Sans TC', sans-serif;
          margin: 0;
          padding: 20px;
          color: #333;
        }
        
        .print-container {
          max-width: 800px;
          margin: 0 auto;
          background: #fff;
          padding: 20px;
        }
        
        .print-header {
          text-align: center;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 2px solid #2575fc;
        }
        
        .print-header h1 {
          color: #2575fc;
          margin: 0 0 10px 0;
        }
        
        .print-timestamp {
          color: #666;
          font-style: italic;
        }
        
        .print-watermark {
          text-align: center;
          font-size: 0.9em;
          color: #999;
          margin: 30px 0;
          padding: 10px;
          border: 1px dashed #ccc;
          background: #f9f9f9;
        }
        
        .print-footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          font-size: 0.9em;
          color: #666;
        }
        
        h2, h3 {
          color: #2575fc;
        }
        
        ul {
          list-style-type: none;
          padding-left: 0;
        }
        
        li {
          margin-bottom: 8px;
          padding: 8px 12px;
          background: #f9f9f9;
          border-radius: 4px;
        }
        
        .icon {
          margin-right: 8px;
          color: #2575fc;
        }
        
        @media print {
          body {
            padding: 0;
          }
          
          .print-container {
            padding: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="print-container">
        <div class="print-header">
          <h1><i class="fas fa-chart-line icon"></i>高雄區會考落點分析結果</h1>
          <div class="print-timestamp">產生時間: ${dateTime}</div>
        </div>
        
        <div class="print-content">
          ${resultsContent}
        </div>
        
        <div class="print-watermark">
          本分析結果僅供參考，實際錄取情況可能因多種因素而有所不同。
        </div>
        
        <div class="print-footer">
          <p> ${new Date().getFullYear()} KHTW 高雄區會考落點分析系統</p>
          <p>本文件由 KHTW 會考落點分析平台自動生成，請與官方發布之資訊核對。</p>
        </div>
      </div>
      
      <script>
        // Automatically print when loaded
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `;
  
  // Write to the new window and print
  printWindow.document.open();
  printWindow.document.write(printContent);
  printWindow.document.close();
}

function closeExportFormatDialog() {
  const modal = document.getElementById('exportFormatModal');
  if (modal) {
    modal.style.display = 'none';
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

function exportAsFormat(format, contentEncoded) {
  const content = decodeURIComponent(contentEncoded);
  let blob, fileName;
  
  switch (format) {
    case 'txt':
      blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      fileName = '高雄區會考落點分析結果.txt';
      break;
    case 'csv':
      const csvContent = convertToCSV(content);
      blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      fileName = '高雄區會考落點分析結果.csv';
      break;
    case 'json':
      const jsonContent = convertToJSON(content);
      blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8' });
      fileName = '高雄區會考落點分析結果.json';
      break;
    case 'html':
      const htmlContent = convertToHTML(content);
      blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      fileName = '高雄區會考落點分析結果.html';
      break;
    default:
      blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      fileName = '高雄區會考落點分析結果.txt';
  }
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  
  logUserActivity('file_exported', { format });
  closeExportFormatDialog();
}

function convertToCSV(content) {
  // Basic conversion to CSV format
  const lines = content.split('\n');
  let csvContent = '';
  
  lines.forEach(line => {
    // Replace multiple spaces with a single comma
    const csvLine = line.trim().replace(/\s{2,}/g, ',');
    if (csvLine) {
      csvContent += csvLine + '\n';
    }
  });
  
  return csvContent;
}

function convertToJSON(content) {
  const lines = content.split('\n');
  const result = {
    title: '高雄區會考落點分析結果',
    generatedTime: new Date().toISOString(),
    summary: {},
    schools: []
  };
  
  let currentSection = '';
  
  lines.forEach(line => {
    line = line.trim();
    if (!line) return;
    
    if (line.includes('總積分：')) {
      result.summary.totalPoints = line.split('：')[1].trim();
    } else if (line.includes('總積點：')) {
      result.summary.totalCredits = line.split('：')[1].trim();
    } else if (line.includes('可能錄取的學校')) {
      currentSection = 'schools';
    } else if (line.match(/^\w+\s*\(\d+所\)$/)) {
      // School type header
      currentSection = line.split('(')[0].trim();
      result.schools.push({
        type: currentSection,
        names: []
      });
    } else if (line.startsWith('共有') && line.includes('所學校')) {
      result.summary.totalSchools = line.match(/\d+/)[0];
    } else if (currentSection && line.includes('icon')) {
      // This is a school name
      const schoolIndex = result.schools.findIndex(s => s.type === currentSection);
      if (schoolIndex !== -1) {
        const schoolName = line.replace(/.*icon\)/, '').trim();
        result.schools[schoolIndex].names.push(schoolName);
      }
    }
  });
  
  return JSON.stringify(result, null, 2);
}

function convertToHTML(content) {
  const lines = content.split('\n');
  let html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>高雄區會考落點分析結果</title>
  <style>
    body {
      font-family: 'Noto Sans TC', sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 20px;
      color: #333;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: #fff;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #2575fc;
    }
    h1 {
      color: #2575fc;
      margin: 0 0 10px 0;
    }
    .timestamp {
      color: #666;
      font-style: italic;
    }
    .section {
      margin-bottom: 20px;
    }
    .section-title {
      color: #2575fc;
      border-bottom: 1px solid #eee;
      padding-bottom: 5px;
    }
    .summary-item {
      font-size: 1.2em;
      font-weight: bold;
      margin: 10px 0;
    }
    .school-list {
      list-style-type: none;
      padding-left: 0;
    }
    .school-item {
      background: #f9f9f9;
      margin: 5px 0;
      padding: 10px;
      border-radius: 5px;
    }
    .school-type {
      margin-top: 20px;
      font-weight: bold;
      color: #333;
    }
    .disclaimer {
      font-size: 0.9em;
      color: #666;
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #eee;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>高雄區會考落點分析結果</h1>
      <div class="timestamp">產生時間: ${new Date().toLocaleString('zh-TW')}</div>
    </div>
    <div class="content">`;

  let inSchoolsList = false;
  let currentSchoolType = '';

  lines.forEach(line => {
    line = line.trim();
    if (!line) return;
    
    if (line.includes('總積分') || line.includes('總積點')) {
      html += `<div class="summary-item">${line}</div>`;
    } else if (line.includes('可能錄取的學校')) {
      html += `<div class="section">
        <h2 class="section-title">${line}</h2>`;
      inSchoolsList = true;
    } else if (line.includes('所學校可能錄取')) {
      html += `<div class="summary-item">${line}</div>`;
    } else if (line.match(/^\w+\s*\(\d+所\)$/)) {
      currentSchoolType = line;
      html += `<div class="school-type">${line}</div>
        <ul class="school-list">`;
    } else if (inSchoolsList && line.includes('icon')) {
      const schoolName = line.replace(/.*icon\)/, '').trim();
      html += `<li class="school-item">${schoolName}</li>`;
    } else if (line.includes('暫時沒有符合條件的學校')) {
      html += `<div class="summary-item">${line}</div>`;
    }
  });

  html += `</ul>
    </div>
    <div class="disclaimer">
      本分析結果僅供參考，實際錄取情況可能因多種因素而有所不同。<br>
      ${new Date().getFullYear()} KHTW 高雄區會考落點分析系統
    </div>
  </div>
</body>
</html>`;

  return html;
}

window.onload = function() {
  showDisclaimer();
};

document.oncontextmenu = function () {
  return false;
};

document.body.onkeydown = function(e) {
  var keyCode = e.keyCode || e.which || e.charCode;
  var ctrlKey = e.ctrlKey || e.metaKey;
  if (ctrlKey && (keyCode == 83 || keyCode == 85 || keyCode == 73)) {
    e.preventDefault();
    return false;
  } else if (keyCode && keyCode == 123) {
    return false;
  }
};

const html5QrCode = new Html5Qrcode("qr-reader");
const qrConfig = { fps: 10, qrbox: { width: 250, height: 250 } };

document.getElementById('scanQRCode').addEventListener('click', () => {
  const qrReader = document.getElementById('qr-reader');
  if (qrReader.style.display === 'none' || qrReader.style.display === '') {
    qrReader.style.display = 'block';
    html5QrCode.start({ facingMode: "environment" }, qrConfig, onScanSuccess);
  } else {
    qrReader.style.display = 'none';
    html5QrCode.stop();
  }
});

function onScanSuccess(decodedText, decodedResult) {
  document.getElementById('invitationCode').value = decodedText;
  html5QrCode.stop();
  document.getElementById('qr-reader').style.display = 'none';
  document.getElementById('qr-result').textContent = `您的邀請碼是：${decodedText}`;

  logUserActivity('qr_scan_success', { invitationCode: decodedText });
}

function handleQRCodeImage(file) {
  logUserActivity('qr_image_upload', { fileName: file.name });

  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        document.getElementById('invitationCode').value = code.data;
        document.getElementById('qr-result').textContent = `您的邀請碼是：${code.data}`;
      } else {
        document.getElementById('qr-result').textContent = '無法識別 QR 碼，請嘗試其他圖片';
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

document.getElementById('fileInput').addEventListener('change', event => {
  const file = event.target.files[0];
  if (file) {
    handleQRCodeImage(file);
  }
});

function toggleMenu() {
  var menu = document.getElementById("fullscreenMenu");
  menu.classList.toggle("show");
  document.body.style.overflow = menu.classList.contains("show") ? "hidden" : "auto";

  var links = menu.getElementsByTagName('a');
  for (var i = 0; i < links.length; i++) {
    links[i].style.animationDelay = (i * 0.1) + 's';
  }
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  updateDarkModeIcon(isDarkMode);

  logUserActivity('toggle_dark_mode', { enabled: isDarkMode });
}

function updateDarkModeIcon(isDarkMode) {
  const icon = document.querySelector('#darkModeToggle i');
  icon.style.transform = 'scale(0)';
  setTimeout(() => {
    if (isDarkMode) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
    icon.style.transform = 'scale(1)';
  }, 150);
}

const savedDarkMode = localStorage.getItem('darkMode') === 'true';
if (savedDarkMode) {
  document.body.classList.add('dark-mode');
}
updateDarkModeIcon(savedDarkMode);

document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);

document.getElementById('currentYear').textContent = new Date().getFullYear();

let userRating = 0;

function initRating() {
  const stars = document.querySelectorAll("#starsContainer .star");
  stars.forEach(star => {
    star.addEventListener("click", function() {
      userRating = Number(this.getAttribute("data-value"));
      updateStarDisplay(userRating);
    });
    star.addEventListener("mouseover", function() {
      const rating = Number(this.getAttribute("data-value"));
      updateStarDisplay(rating);
    });
    star.addEventListener("mouseout", function() {
      updateStarDisplay(userRating);
    });
  });

  const submitRatingButton = document.getElementById("submitRating");
  submitRatingButton.addEventListener("click", function() {
    if (userRating === 0) {
      alert("請選擇評分星數！");
      return;
    }
    this.disabled = true;
    logUserActivity("user_rating", { rating: userRating });
    const ratingMsg = document.getElementById("ratingMessage");
    ratingMsg.textContent = "感謝您的評分！";
    ratingMsg.style.display = "block";
  });
}

function updateStarDisplay(rating) {
  const stars = document.querySelectorAll("#starsContainer .star");
  stars.forEach(star => {
    const starValue = Number(star.getAttribute("data-value"));
    if (starValue <= rating) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", initRating);