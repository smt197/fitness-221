provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "ubuntu_server" {
  ami           = "ami-05cf1e9f73fbad2e2"
  instance_type = "t3.micro"

    associate_public_ip_address = true

  key_name = aws_key_pair.deployer.key_name

    vpc_security_group_ids = [aws_security_group.ec2_sg.id]


  user_data = <<-EOF
              #!/bin/bash
              apt update -y
              apt install -y docker.io docker-compose-plugin

              systemctl enable docker
              systemctl start docker

              sleep 10

              usermod -aG docker ubuntu

                # Vérification
              docker --version
              docker compose version
                # création d'un répertoire pour l'application
              mkdir -p /home/ubuntu/fitness-221
              chown ubuntu:ubuntu /home/ubuntu/fitness-221
              EOF

  tags = {
    Name = "ubuntu-docker-server"
  }
}

resource "aws_security_group" "ec2_sg" {
    name        = "ec2_security_group"
    description = "Allow SSH, HTTP and Docker applications traffic"
    
    ingress {
        description = "SSH"
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    ingress {
        description = "HTTP"
        from_port   = 80
        to_port     = 80
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    ingress {
        description = "Port application Docker"
        from_port   = 5000
        to_port     = 5000
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

resource "aws_key_pair" "deployer" {
  key_name   = "my-ec2-key"
  public_key = file("my-ec2-key.pub")
}


output "public_ip" {
  value = aws_instance.ubuntu_server.public_ip
}