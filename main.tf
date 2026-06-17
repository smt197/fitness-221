provider "aws" {
  region = "us-east-1"
}

# VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

# Internet Gateway
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id
}

# Subnet public
resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1c"
  map_public_ip_on_launch = true
}

# Route table
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route" "internet_access" {
  route_table_id         = aws_route_table.public.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.gw.id
}

# Association subnet -> route table
resource "aws_route_table_association" "a" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

# Security group
resource "aws_security_group" "ec2_sg" {
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Key
resource "aws_key_pair" "deployer" {
  key_name   = "my-ec2-key"
  public_key = file("my-ec2-key.pub")
}

# EC2
resource "aws_instance" "ubuntu" {
  ami           = "ami-05cf1e9f73fbad2e2"
  instance_type = "t3.micro"

  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.ec2_sg.id]

  key_name = aws_key_pair.deployer.key_name

  user_data = <<-EOF
              #!/bin/bash

              set -eux
              exec > /var/log/user-data.log 2>&1

              apt-get update -y
              apt-get install -y docker.io docker-compose-v2

              systemctl enable docker
              systemctl start docker
              usermod -aG docker ubuntu

              docker --version || true
              docker compose version || true

              EOF
  tags = {
    Name = "ubuntu-docker-server"
  }
}

# Output de l'IP publique
output "server_ip" {
  value       = aws_instance.ubuntu.public_ip
  description = "IP publique du serveur EC2"
}

# Lancer Ansible automatiquement après la création du serveur
resource "terraform_data" "ansible_provisioner" {
  depends_on = [aws_instance.ubuntu]

  triggers_replace = [aws_instance.ubuntu.id]

  provisioner "local-exec" {
    command = "echo 'Waiting 30s for EC2 to boot...' && sleep 30 && ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -i '${aws_instance.ubuntu.public_ip},' -u ubuntu --private-key my-ec2-key ansible/playbook.yml"
  }
}