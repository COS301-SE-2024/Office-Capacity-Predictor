package mail

import (
	"sync"

	"github.com/COS301-SE-2024/occupi/occupi-backend/configs"
	"gopkg.in/gomail.v2"
)

// SendMail sends an email using gomail
func SendMail(to string, subject string, body string) error {
	if configs.GetGinRunMode() == "test" {
		return nil // Do not send emails in test mode
	}

	from := configs.GetSystemEmail()
	password := configs.GetSMTPPassword()
	smtpHost := configs.GetSMTPHost()
	smtpPort := configs.GetSMTPPort()

	m := gomail.NewMessage()
	m.SetHeader("From", from)
	m.SetHeader("To", to)
	m.SetHeader("Subject", subject)
	m.SetBody("text/html", body)

	d := gomail.NewDialer(smtpHost, smtpPort, from, password)

	if err := d.DialAndSend(m); err != nil {
		return err
	}

	return nil
}

func SendMultipleEmailsConcurrently(emails []string, subject, body string) []string {
	if configs.GetGinRunMode() == "test" {
		return []string{} // Do not send emails in test mode
	}

	// Use a WaitGroup to wait for all goroutines to complete
	var wg sync.WaitGroup
	var emailErrors []string
	var mu sync.Mutex

	for _, email := range emails {
		wg.Add(1)
		go func(email string) {
			defer wg.Done()
			if err := SendMail(email, subject, body); err != nil {
				mu.Lock()
				emailErrors = append(emailErrors, email)
				mu.Unlock()
			}
		}(email)
	}

	// Wait for all email sending goroutines to complete
	wg.Wait()

	return emailErrors
}
